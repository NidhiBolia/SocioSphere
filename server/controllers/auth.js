import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

/*REGISTER */
export const register=async(req,res)=>{
    try{
        const{
            firstName,
            lastName,
            email,
            password,
            picturePath,
            location,
            occupation
        }=req.body;
        const salt=await bcrypt.genSalt(10);
        const passwordHash=await bcrypt.hash(password,salt);
        const newUser=new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
            picturePath,
            location,
            occupation,
            viewedProfile:Math.floor(Math.random()*10000),
            impressions:Math.floor(Math.random()*10000)
        });
        const saveUser=await newUser.save();
        res.status(201).json(saveUser);
    }catch(error){
       res.status(500).json({error:error.message});
    }
};

/*LOGIN */
export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user= await User.findOne({email:email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(404).json({message:"Invalid credentials"});
        };
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        console.log(user._id);
        delete user.password;
        res.status(200).json({result:user,token});
    }catch(error){
        res.status(500).json({error:error.message});
    }

};

import User from "../models/user.js";

/*READ*/
export const getUser = async (req, res) => {
    try{
        const {id}=req.params;
        const user=await User.findById(id);
        res.status(200).json(user);
    }catch(err){
        res.status(404).json(err);
    }
}

export const getUserFriends = async (req, res) => {
    try{
        const {id}=req.params;
        const user=await User.findById(id);
    
        const friends=await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
    
        const formattedFriends=friends.map(
            ({_id,firstName,lastName,occupation,location,picturePath})=>
             {
                return {_id,firstName,lastName,occupation,location,picturePath};
            }
        );
        res.status(200).json(formattedFriends);
    }catch(err){
        res.status(404).json(err);
    }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendID } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendID);

        if (user.friends.includes(friendID)) {
            user.friends = user.friends.filter((friend) => friend !== friendID);
            friend.friends = friend.friends.filter((friend) => friend !== id);
        } else {
            user.friends.push(friendID);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const updatedUser = await User.findById(id);
        const updatedFriends = await Promise.all(
            updatedUser.friends.map((friendId) => User.findById(friendId))
        );

        const formattedFriends = updatedFriends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

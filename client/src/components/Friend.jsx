import React from 'react'
import { PersonAddAlt1Outlined,PersonRemoveAlt1Outlined } from '@mui/icons-material'
import { Box,IconButton,Typography,useTheme } from '@mui/material'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setFriends } from 'state'
import UserImage from './UserImage'

export default function Friend({friendId,name,subtitle,userPicturePath}) {
    const { palette } = useTheme();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { _id } = useSelector((state) => state?.user || "");
    const token=useSelector((state)=>state.token);
    const friends=useSelector((state)=>state?.user?.friends)||[];
    const primaryLight=palette.primary.light;
    const primaryDark=palette.primary.dark;
    const main=palette.neutral.main;
    const medium=palette.neutral.medium;

    const isFriend=friends.find((friend)=>friend._id===friendId);
    const patchFriend=async()=>{
        const response=await fetch(`http://localhost:3001/users/${_id}/friends/${friendId}`,{
            method:'PATCH',
            headers:{Authorization:`Bearer ${token}`}
        })
        const data=await response.json();
        dispatch(setFriends(data));
    };
   
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center gap-2">
          <UserImage image={userPicturePath} size="55px"/>
        <Box onClick={()=>{
          navigate(`/profile/${friendId}`);
          navigate(0);
        }}>
          <Typography className={`text-${main} text-5xl font-[500] hover:text-${palette.primary.light} hover:cursor-pointer`}>
            {name}
          </Typography>
          <Typography className={`text-${medium} text-[0.75rem]`}>{subtitle}</Typography>
           </Box>
        </div>
        <IconButton onClick={()=>patchFriend()} className={`bg-${primaryLight} p-[0.6rem]`}>
          {isFriend?(<PersonRemoveAlt1Outlined className={`text-${primaryDark}`}/>):<PersonAddAlt1Outlined className={`text-${primaryDark}`}/>}
          </IconButton>
      </div>
    </div>
  )
}

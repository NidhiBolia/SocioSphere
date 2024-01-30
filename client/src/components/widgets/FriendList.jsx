import {React,useEffect} from 'react'
import { Box,Typography,useTheme } from '@mui/material'
import WidgetWrapper from './WidgetWrapper'
import { useDispatch,useSelector } from 'react-redux'
import { setFriends } from 'state'
import Friend from 'components/Friend'

export default function FriendList({userId}) {
    const dispatch=useDispatch();
    const theme=useTheme();
    const token=useSelector((state)=>state.token);
    const friends=useSelector((state)=>state.friends);

    const getFriends=async()=>{
        const response=await fetch(
            `http://localhost:3001/users/${userId}/friends`,
            {
                method:"GET",
                headers:{Authorization:`Bearer ${token}`}
            }
        );
        const data=await response.json();
        dispatch(setFriends({friends:data}));
    };
    useEffect(()=>{
        getFriends();
    },[]);
  return (
    <div>
      <WidgetWrapper>
        <Typography className={`text-${theme.palette.neutral.dark} font-[500] mb-[1.5rem]`}>Friends</Typography>
        <Box className="flex flex-col gap-[1.5rem]">
            {friends.map((friend)=>(
                <Friend
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                subtitle={friend.occupation}
                userPicturePath={friend.picturePath}
                />
            ))}
        </Box>
        </WidgetWrapper>
    </div>
  )
}

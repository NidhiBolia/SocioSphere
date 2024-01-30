import React from 'react'
import { ChatBubbleOutlineOutlined,FavoriteBorderOutlined,FavoriteOutlined,ShareOutlined } from '@mui/icons-material'
import { Box,Divider,IconButton,Typography,useTheme } from '@mui/material'
import Friend from 'components/Friend'
import WidgetWrapper from './WidgetWrapper'
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { setPost } from 'state'
// liked={
//   'userid1':true,
//   'userid2':true
// }
export default function Post({postId,postUserId,name,description,location,picturePath,userPicturePath,likes,comments}){
  const [isComment, setIsComment] = useState(false);
    const dispatch=useDispatch();
    const token=useSelector((state)=>state.token);
    const loggedInUserId =useSelector((state)=> state?.user?._id);
    const isLiked=Boolean(likes[loggedInUserId])
    const likeCount=Object.keys(likes).length;
    const { palette } = useTheme();
    const main=palette.neutral.main;
    const primary=palette.primary.main;

    const patchLike=async()=>{
      const  response=await fetch(`http://localhost:3001/posts/${postId}/like`,{
        method:'PATCH',
        headers:{Authorization:`Bearer ${token}`,
        "Content-Type":"application/json",
      },
      body:JSON.stringify({userId:loggedInUserId})
      });
      const updatedPost=await response.json();
      dispatch(setPost({post:updatedPost}))
    }
    return (
      <div>
        <WidgetWrapper className='py-8 px-0'>
        <Friend friendId={postUserId} name={name} subtitle={location} userPicturePath={userPicturePath}/>
        <Typography className={`text-${main} mt-4`} > {description}</Typography>
        {picturePath && (<img alt="post" className='w-full h-auto rounded-[0.75rem] mt-3' src={`http://localhost:3001/assets/${picturePath}`}/>)}
        <div className='flex justify-between items-center mt-1 '>
        <div className="flex justify-between items-center gap-2 ">
        <div className="flex justify-between items-center gap-[0.3rem]">
        <IconButton onClick={patchLike} className='p-1'>
        {isLiked ? <FavoriteOutlined sx={{color:primary}}/> : <FavoriteBorderOutlined/>}
        </IconButton>
        <Typography className={`text-${main}`}>{likeCount}</Typography> 
        </div>
        {/* Comments */}
        <div className="flex justify-between items-center gap-[0.3rem]">
        <IconButton onClick={()=>setIsComment(!isComment)} className='p-1'>
        <ChatBubbleOutlineOutlined/>
        </IconButton>
        <Typography className={`text-${main}`}>{comments.length}</Typography>
        </div>    
        </div>
        {/* Share */}
        <IconButton className='p-1'>
        <ShareOutlined/>
        </IconButton>
        </div>
        {isComment && (
          <Box className='mt-4'>
          {comments.map((comment)=>(
            <Box key={`${name}`}>
            <Divider/>
            <Typography className={`text-${main} m-2 p-4`}>{comment}</Typography>
            </Box>
          ))}
          <Divider/>
          </Box>
    
        )}
                </WidgetWrapper>
      </div>
    )
  }


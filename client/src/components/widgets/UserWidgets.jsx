import React, { useEffect, useState } from 'react';
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Typography, Divider, useTheme } from '@mui/material';
import UserImage from 'components/UserImage';
import Widgets from 'components/Widgets';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function UserWidgets({ userId, picturePath }) {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, [userId, token]);

  if (!user) {
    return null;
  }

  const { firstName, lastName, location, occupation, viewedProfile, impressions, friends } = user;

  return (
    <div>
   <Widgets>
    <div className='flex justify-between  items-center gap-2 pb-8 ' onClick={()=>navigate(`/profile/${userId}`)}>
    <div className='flex justify-between  items-center'>
      <UserImage image={picturePath}/>
      <div>
        <Typography variant='h4' color={dark} fontWeight="500" sx={{"&:hover":{color:palette.primary.light,cursor:"pointer" }}}>
          {firstName} {lastName}
        </Typography>
        <Typography color={medium}>{friends.length}friends</Typography>
      </div>
      <ManageAccountsOutlined color={main} />
    </div>
    <Divider/>

    {/* location and occupation */}
    <div className="second p-4 ">
      <div className="flex items-center gap-4 mb-2">
      <LocationOnOutlined fontSize="large" sx={{ color: main }} />
        <Typography color={medium}>{location}</Typography>
      </div>
    <div className="flex items-center gap-4 ">
    <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
        <Typography color={medium}>{occupation}</Typography>
      </div>
    </div>

    {/* impressions and viewed profile */}
    <div className='p-4'>
    <div className='flex  justify-betweenitems-center'>
    <Typography color={medium}>Viewed Profile</Typography>
    <Typography color={main} fontWeight="500">{viewedProfile}</Typography>
    </div>
    <div className='flex  justify-betweenitems-center'>
    <Typography color={medium}>Impressions</Typography>
    <Typography color={main} fontWeight="500">{impressions}</Typography>
    </div>
    </div>

    {/* edit profile */}
    <div className='p-4'>
      <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">Social Profiles</Typography>
      {/* twitter */}
      <div className='flex justify-between items-center gap-4 mb-2'>
      <div className='flex justify-between items-center gap-4 '>
      <img src="../assets/twitter.png"></img>
      <div>
        <Typography color={main} fontWeight="500">
          Twitter
        </Typography>
        <Typography color={medium}>Social</Typography>
      </div>
      </div>
      <EditOutlined color={main} />
      </div>
      {/* Linkedin */}
      <div className='flex justify-between items-center gap-4 '>
      <div className='flex justify-between items-center gap-4 '>
      <img src="../assets/linkedin.png"></img>
      <div>
        <Typography color={main} fontWeight="500">
          Linkedin
        </Typography>
        <Typography color={medium}>Network</Typography>
      </div>
      </div>
      <EditOutlined color={main} />
      </div>
    </div>


    {/* end */}
    </div>
   </Widgets>
    </div>
  );
}

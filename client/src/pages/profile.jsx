import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from 'components/Navbar';
import FriendList from 'components/widgets/FriendList';
import MyPost from 'components/widgets/MyPost';
import Posts from 'components/widgets/Posts';
import UserWidgets from 'components/widgets/UserWidgets';

export default function Profile() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const picturePath = useSelector((state) => state?.user?.picturePath);
  const token = useSelector((state) => state.token);
  const nonMobile = useMediaQuery('(min-width:1000px)');

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
  }, [userId, token]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <div>
      <Box>
        <Navbar />
        <div className={`w-full px-8 py-[6%] ${nonMobile ? 'flex ' : 'block'} g-2 justify-center `}>
          <Box flexBasis={nonMobile ? '26%' : undefined}>
            <UserWidgets userId={userId} picturePath={picturePath} />
            <Box className="mx-8 my-0" />
            <FriendList userId={userId} />
          </Box>
          <Box flexBasis={nonMobile ? '42%' : undefined} mt={nonMobile ? undefined : '2rem'}>
            <MyPost picturePath={picturePath} />
            <Box className="mx-8 my-0" />
            <Posts userId={userId} isProfile/>
          </Box>
        </div>
      </Box>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOutlined,
  WorkOutOutlined,
} from '@mui/icons-material';
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
   
    </div>
  );
}

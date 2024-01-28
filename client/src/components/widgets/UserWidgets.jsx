  import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
  } from "@mui/icons-material";

  import {  Typography, Divider, useTheme } from "@mui/material";
  import UserImage from "components/UserImage";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import WidgetWrapper from "./WidgetWrapper";


  const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState();
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const background = useTheme().palette.background.alt;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const dark = palette.neutral.dark;
    const theme=useTheme();
    const getUser = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    useEffect(() => {
      getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    if (!user) {
      return null;
    }
  
    const {
      firstName,
      lastName,
      location,
      occupation,
      viewedProfile,
      impressions,
      friends,
    } = user;
  
    return (
      <WidgetWrapper className="mr-10">
        <div className={`flex justify-between items-center gap-4 pb-[1rem]`} onClick={() => navigate(`/profile/${userId}`)}>
          <div className='flex justify-between items-center gap-4'>
            <UserImage image={picturePath} />
            <div style={{color:dark}} className='hover:text-gray-400 text-xl hover:cursor-pointer '>
              <span>{firstName} {lastName}</span>
              {friends && <Typography color={medium}>{friends.length} friends</Typography>}
            </div>
          </div>
          <ManageAccountsOutlined color={main} />
        </div>
        <Divider />
        
  
        {/* location and occupation */}
        <div className="second py-4 px-0 ">
          <div className="flex items-center gap-4 mb-2">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </div>
          <div className="flex items-center gap-4 ">
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{occupation}</Typography>
          </div>
        </div>
        <Divider />


        {/* impressions and viewed profile */}
        <div className='py-4 px-0'>
          <div className='flex  justify-between items-center mb-2'>
            <Typography color={medium}>Viewed Profile:</Typography>
            {viewedProfile && <Typography color={main} fontWeight="500"> {viewedProfile} </Typography>}
          </div>
          <div className='flex  justify-between items-center'>
            <Typography color={medium}>Impressions:</Typography>
            {impressions && <Typography color={main} fontWeight="500">{impressions}</Typography>}
          </div>
        </div>
        <Divider />


        {/* edit profile */}
        <div className='py-4 px-0'>
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">Social Profiles</Typography>
          {/* twitter */}
          <div className='flex justify-between items-center gap-6 mb-2'>
            <div className='flex justify-between items-center gap-6 '>
              <img src="../assets/twitter.png" alt="twitter"></img>
              <div>
                <Typography color={main} fontWeight="500" className="pr-4 ">
                  Twitter
                </Typography>
                <Typography color={medium}>Social</Typography>
              </div>
            </div>
            <EditOutlined sx={{ color: main }} />
          </div>
          {/* Linkedin */}
          <div className='flex justify-between items-center gap-4 '>
            <div className='flex justify-between items-center gap-4 '>
              <img src="../assets/linkedin.png" alt="linkdin"></img>
              <div>
                <Typography color={main} fontWeight="500">
                  Linkedin
                </Typography>
                <Typography color={medium}>Network</Typography>
              </div>
            </div>
            <EditOutlined sx={{ color: main }} />
          </div>
        </div>
  
        {/* end */}
      </WidgetWrapper>
    );
  }
  
  export default UserWidget;
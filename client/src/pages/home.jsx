import React from "react";
import Navbar from "components/Navbar";
import { useMediaQuery,Box } from "@mui/material";
import {useSelector} from "react-redux";
import UserWidgets from "../components/widgets/UserWidgets";
import MyPost from "../components/widgets/MyPost";
import Posts from "components/widgets/Posts";
import Advert from "components/widgets/Advert";
import FriendList from "components/widgets/FriendList";

export default function Home() {
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const userId = useSelector((state)=> state?.user?._id);
  const picturePath = useSelector((state)=> state?.user?.picturePath);

  return (
    <div>
      <Navbar />
      <div className={`w-full px-8 py-[6%] ${isNonMobile ? 'flex ' : 'block'} g-2 justify-between `}>
  <Box flexBasis={isNonMobile?"26%":undefined}>
    <UserWidgets userId={userId}  picturePath={picturePath}/>
  </Box>
  <Box flexBasis={isNonMobile?"42%":undefined} mt={isNonMobile?undefined:"2rem"}>
  <MyPost picturePath={picturePath} />
  <Posts userId={userId}/>
  </Box>
  {isNonMobile && <Box flexBasis="26%">
    <Advert />
    <Box className="mx-4 my-0"/>
    <FriendList userId={userId}/>
    </Box>}
</div>
    </div>
  );
}
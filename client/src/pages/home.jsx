import React from "react";
import Navbar from "components/Navbar";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidgets from "../components/widgets/UserWidgets";

export default function Home() {
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const  {_id,picturePath} = useSelector(state => state?.user); 


  return (
    <div>
      <Navbar />
      <div className={`w-4 p-8 ${isNonMobile ? 'flex g-2 justify-between' : 'block'}`}>
  <div className={isNonMobile ? 'flex-basis-26' : ''}>
    <UserWidgets userId={_id} picturePath={picturePath} />
  </div>
</div>

    </div>
  );
}

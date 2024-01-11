import React from "react";
import Navbar from "components/Navbar";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidgets from "../components/widgets/UserWidgets";

export default function Home() {
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <div>
      <Navbar />
      <div className="w-full px-6 md:flex md:gap-2 md:justify-between">
        <div className="flex-basis md:flex-basis-26">
          <UserWidgets userId={_id} picturePath={picturePath} />
        </div>
        <div className="flex-basis md:flex-basis-42 md:mt-2">
          {/* <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} /> */}
        </div>
        {isNonMobile && (
          <div className="flex-basis md:flex-basis-26">
            {/* <AdvertWidget /> */}
            <div className="my-8"></div>{" "}
            {/* <FriendListWidget userId={_id} /> */}
          </div>
        )}
      </div>
    </div>
  );
}

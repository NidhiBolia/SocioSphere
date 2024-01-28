// import React from "react";
// import Navbar from "components/Navbar";
// import { useMediaQuery } from "@mui/material";
// import {useSelector} from "react-redux";
// import UserWidgets from "../components/widgets/UserWidgets";

// export default function Home() {
//   const isNonMobile = useMediaQuery("(min-width:1000px)");
//   const _id = useSelector((state)=> state.user);
//   const picturePath = useSelector((state)=> state .user);
//   return (
//     <div>
//       <Navbar />
//       <div className={`w-4 p-8 ${isNonMobile ? 'flex g-2 justify-between' : 'block'}`}>
//   <div className={isNonMobile ? 'flex-basis-26' : ''}>
//     <UserWidgets userId={_id}  picturePath={picturePath}/>
//   </div>
// </div>
//     </div>
//   );
// }
import React from "react";
import Navbar from "components/Navbar";
import { useMediaQuery,Box } from "@mui/material";
import {useSelector} from "react-redux";
import UserWidgets from "../components/widgets/UserWidgets";
import MyPost from "../components/widgets/MyPost";

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
  </Box>
  {isNonMobile && <Box flexBasis="32%" mt="2rem"></Box>}
</div>
    </div>
  );
}
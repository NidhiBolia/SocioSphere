import { useState } from "react";
import { Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [MenuToggle, SetMenuToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  // const background = theme.palette.background.default;
  // const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  // const fullName = `${user.firstName} ${user.lastName}`;
  const fullName = user?.firstName ? `${user.firstName} ${user.lastName}` : "";

  return (
    <>  
      <div  style={{ backgroundColor: alt}} className={`flex justify-between items-center pt-4 pb-4 pl-[6%] pr-[6%] `}>
        {isNonMobile && (
         <div  style={{ backgroundColor: neutralLight }}
         className={`search  rounded-lg gap-12 pt-[0.1rem] pb-[0.1rem] pr-[1.5rem] pl-[1.5rem] flex justify-between items-center`}
       >
            <InputBase placeholder="Search"/>
              <IconButton>
                <Search />
              </IconButton>
          </div>
        )}
        <div
          className="name font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-blue-400 hover:text-blue-700 hover:cursor-pointer"
          onClick={() => navigate("/home")}
        >
          SocioSphere
        </div>

        {/* Desktop Nav */}
        {isNonMobile ? (
          <div className="flex justify-between items-center gap-8">
            <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select value={fullName} style={{ backgroundColor: neutralLight }}
                className={` w-[150px] rounded-[0.25rem] pt-1 pb-1 pr-4 pl-4  focus:bg-${neutralLight} "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                }`}
                input={<InputBase />}
              >
                <MenuItem  value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        ) : (
          <IconButton onClick={() => SetMenuToggle(!MenuToggle)}>
            <Menu />
          </IconButton>
        )}

        {/* Mobile Nav */}
        {!isNonMobile && MenuToggle && (
          <div  className={`fixed right-0 bottom-0 h-full z-10 w-[500px] min-w-300`}>
            <Box className="flex justify-end p-4">
              <IconButton onClick={() => SetMenuToggle(!MenuToggle)}>
                <Close />
              </IconButton>
            </Box>
            {/* Menu Items */}
            <div style={{ backgroundColor: neutralLight  }} className=" menu flex flex-col  items-center justify-center gap-12 ">
              <IconButton
                onClick={() => dispatch(setMode())}
                className="text-xl"
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode className="text-xl" />
                ) : (
                  <LightMode className="text-xl" />
                )}
              </IconButton>
              <Message sx={{ fontSize: "25px" }} />
              <Notifications sx={{ fontSize: "25px" }} />
              <Help sx={{ fontSize: "25px" }} />
              <FormControl variant="standard" value={fullName}>
                <Select value={fullName}
                  className={`bg-${neutralLight} w-[150px] rounded-[0.25rem] pt-1 pb-1 pr-4 pl-4  focus:bg-${neutralLight}`}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Navbar;

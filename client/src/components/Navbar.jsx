import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Icon,
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
  FileCopy,
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
  const neutralDark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.alt;
  // const fullName=`${user.firstName} ${user.lastName}`;

  return (
    <>
      <nav className={`flex justify-between items-center p-4 bg-${alt}`}>
        {isNonMobile && (
          <div
            className={` search bg-${neutralLight} border-radius-3 rounded-lg gap-8 pt-1 pb-1 pr-2 pl-2 flex justify-between items-center`}
          >
            <InputBase placeholder="Search">
              <IconButton>
                <Search />
              </IconButton>
            </InputBase>
          </div>
        )}
        <div
          className="name font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-blue-400 hover:text-blue-700 hover:cursor-pointer"
          onClick={() => {
            window.location.href = "/home";
          }}
        >
          SocioSphere
        </div>

        {/* Desktop Nav */}
        {isNonMobile ? (
          <div className="flex justify-between items-center gap-8">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode className="text-xl" />
              ) : (
                <LightMode className="text-xl" />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard">
              <Select
                className={`bg-${neutralLight} w-150px rounded-0.25rem p-0.25rem 1rem focus:bg-${neutralLight}`}
                input={<InputBase />}
              >
                <MenuItem>
                  <Typography></Typography>
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
          <Box className={`fixed right-0 bottom-0 h-full z-10 max-w-500 min-w-300 bg-${background} `}>
            <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => SetMenuToggle(!MenuToggle)}
            >
              <Close />
            </IconButton>
          </Box>
            {/* Menu Items */}
            <div className=" menu flex flex-row  items-center justify-center gap-12 ">
              <IconButton
                onClick={() => dispatch(setMode())}
                className="text-x"
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
              <FormControl variant="standard">
                <Select
                  className={`bg-${neutralLight} w-150px rounded-0.25rem p-0.25rem 1rem focus:bg-${neutralLight}`}
                  input={<InputBase />}
                >
                  <MenuItem>
                    <Typography>Hello</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </Box>
        )}
      </nav>
    </>
  );
};
export default Navbar;

import React from "react";
import Button from "@mui/material/Button";
import { RiMenu2Line, RiCloseLine } from "react-icons/ri";
import { IconButton, Badge, Menu, MenuItem, Divider } from "@mui/material";
import { styled } from "@mui/material";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { PiGearFineBold } from "react-icons/pi";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const DashHeader = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user } = useContext(UserContext);
  const [anchorMyAcc, setAnchorMyAcc] = React.useState(null);
  const open = Boolean(anchorMyAcc);

  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };

  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };

  return (
    <header
      className={`w-full h-auto py-2 px-4 shadow-sm bg-white flex items-center justify-between transition-all duration-300
        ${isSidebarOpen ? "md:pl-64 sm:pl-4" : "pl-4"}`}
    >
      {/* Menu Button - Stays Fixed on Small Screens & Becomes "X" when Sidebar is Open */}
      <Button
        className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] text-[rgba(0,0,0,0.8)] sm:fixed sm:left-4 sm:top-2 sm:z-50"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        {isSidebarOpen ? (
          <RiCloseLine className="text-[22px] text-[rgba(0,0,0,0.8)]" /> // "X" when sidebar is open
        ) : (
          <RiMenu2Line className="text-[22px] text-[rgba(0,0,0,0.8)]" /> // Menu icon when closed
        )}
      </Button>

      <div className="flex items-center gap-4">
        <IconButton aria-label="notifications">
          <StyledBadge badgeContent={4} color="secondary">
            <FaRegBell />
          </StyledBadge>
        </IconButton>

        {/* User Profile Menu */}
        <div className="relative">
          <div className="w-[35px] h-[35px] rounded-full overflow-hidden cursor-pointer" onClick={handleClickMyAcc}>
            <img src="https://ecme-react.themenate.net/img/avatars/thumb-1.jpg" className="w-full h-full object-cover" />
          </div>

          <Menu
            anchorEl={anchorMyAcc}
            open={open}
            onClose={handleCloseMyAcc}
            onClick={handleCloseMyAcc}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleCloseMyAcc} className="!bg-white">
              <div className="flex items-center gap-3">
                <div className="w-[35px] h-[35px] rounded-full overflow-hidden cursor-pointer">
                  <img src="https://ecme-react.themenate.net/img/avatars/thumb-1.jpg" className="w-full h-full object-cover" />
                </div>
                <div className="info">
                  <h3 className="text-[15px] font-[500] leading-5">
                    {user.first_name} {user.last_name}
                  </h3>
                  <p className="text-[12px] font-[400] opacity-70">{user.email}</p>
                </div>
              </div>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default DashHeader;

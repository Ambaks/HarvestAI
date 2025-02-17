import { Button, Divider } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { RxDashboard, RxGear } from "react-icons/rx";
import { TbBuildingCircus } from "react-icons/tb";
import { FaMoneyCheck } from "react-icons/fa";
import { GiWheat } from "react-icons/gi";
import { useFetchUser } from "../api/authService";
import { brainwave } from "../assets";

const FarmerSidebar = () => {
  const { user } = useFetchUser();
  const location = useLocation();

  return (
    <div className="sidebar fixed top-0 left-0 bg-white shadow-lg w-[200px] h-full border-r border-gray-200 py-4 px-4">
      {/* Logo */}
      <div className="mb-2 flex justify-center">
        <Link to="/">
          <img src={brainwave} width={190} height={40} alt="QuikCrops" />
        </Link>
      </div>
      <Divider className="pb-1" />

      {/* Sidebar Menu */}
      <ul className="space-y-3 mt-20">
        <li className="space-y-6">
            <SidebarButton 
              to="/farmer-dashboard/" 
              icon={<RxDashboard className="text-[18px]" />}
              text="Dashboard" 
              active={location.pathname === "/farmer-dashboard" || location.pathname === "/farmer-dashboard/"}
            />

            <SidebarButton 
              to={`/farmer-dashboard/mycrops/${user.id}`} 
              icon={<GiWheat className="text-[18px]" />}
              text="My Crops" 
              active={location.pathname.includes("/farmer-dashboard/mycrops")}
            />

            <SidebarButton 
              to={`/farmer-dashboard/transactions/${user.id}`} 
              icon={<FaMoneyCheck className="text-[18px]" />}
              text="Sales" 
              active={location.pathname.includes("/farmer-dashboard/transactions")}
            />

            <SidebarButton 
              to="/farmer-dashboard/marketplace" 
              icon={<TbBuildingCircus className="text-[18px]" />}
              text="Marketplace" 
              active={location.pathname.includes("/farmer-dashboard/marketplace")}
            />

            <SidebarButton 
              to={`/farmer-dashboard/settings/${user.id}`} 
              icon={<RxGear className="text-[18px]" />}
              text="Settings" 
              active={location.pathname.includes("/farmer-dashboard/settings")}
            />
        </li>
      </ul>
    </div>
  );
};

const SidebarButton = ({ to, icon, text, active }) => (
  <Link to={to} className={` w-full px-4 py-3 flex items-center gap-3 rounded-lg transition-all
    ${active ? "bg-[#635BFF] text-white font-bold shadow-md" : "text-gray-500 hover:bg-gray-100"}`}>
    {icon}
    <span>{text}</span>
  </Link>
);

export default FarmerSidebar;
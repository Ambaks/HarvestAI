import { Button, Divider } from "@mui/material";
import { brainwave } from "../assets";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx"

const Sidebar = () => {
  return (
    <div className='sidebar fixed top-0 left-0 bg-[#f1f1f1] w-[14%] h-full border-r border-[rgba(0,0,0,0.1)] py-2 px-2'>
      <div className='py-2 w-full'>
        <Link to="/">
            <img src={brainwave} width={190} height={40} alt="QuikCrops" />
        </Link>
      </div>

      <ul className="mt-2">
        <li> 
            <Divider />
            
            <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] text-[rgba(0,0,0,0.8)] font-[500] items-center" href="/dashboard/"> 
                <RxDashboard className="text-[18px]"/> <span>Dashboard</span>
            </Button>

            <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] text-[rgba(0,0,0,0.8)] font-[500] items-center" href="/dashboard/users"> 
                <RxDashboard className="text-[18px]"/> <span>Users</span>
            </Button>

            <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] text-[rgba(0,0,0,0.8)] font-[500] items-center"> 
                <RxDashboard className="text-[18px]"/> <span>Sales</span>
            </Button>
                
            <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] text-[rgba(0,0,0,0.8)] font-[500] items-center"> 
                <RxDashboard className="text-[18px]"/> <span>Marketplace</span>
            </Button>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar;

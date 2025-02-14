import React from "react";
import { Routes, Route } from "react-router-dom";
import DashHeader from "../components/DashHeader";
import FarmerDash from "../pages/FarmerDash";
import FarmerSidebar from "../components/FarmerSidebar";
import FarmerCrops from "../pages/FarmerCrops";
import FarmerSettings from "../pages/FarmerSettings";
import FarmerTransactions from "../pages/FarmerTransactions";
import FarmerMarketplace from "../pages/FarmerMarketplace";

const FarmerDashLayout = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <section className="main h-screen flex flex-col overflow-x-hidden">
      <DashHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
      <div className="contentMain flex flex-1 transition-all duration-300 min-h-screen bg-[#fafbfd]">
        {/* Sidebar that remains visible */}
        <div className={`text-black bg-white md:relative h-full shadow-lg transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-50 md:w-[10px] sm:w-full sm:fixed sm:left-0 sm:z-50" : "w-0 md:w-0 sm:-left-full"}`}
        >
        {isSidebarOpen && <FarmerSidebar />}
        </div>

        {/* Dynamic Content Area */}
        <div
          className={`flex-1 pr-2 text-black pt-[70px] pb-4 overflow-x-hidden transition-all duration-300 w-full min-w-0 ${isSidebarOpen ? "md:ml-[205px] sm:ml-0" : "ml-0"}`}        >
        <Routes>
            <Route path="/" element={<FarmerDash />} />
            <Route path="/mycrops/:user_id" element={<FarmerCrops />} />
            <Route path="/settings/:user_id" element={<FarmerSettings />} />
            <Route path="/transactions/:user_id" element={<FarmerTransactions />} />
            <Route path="/marketplace" element={<FarmerMarketplace />} />
        </Routes>
        </div>
      </div>
    </section>
  );
};

export default FarmerDashLayout;

import React from "react";
import FarmerDashboardBoxes from "../components/DashboardBoxes";
import { LineChart } from '@mui/x-charts/LineChart';
import { Button } from "@mui/material";
import {useFetchUser} from "../api/authService";

const FarmerDash = () => {
  const { user } = useFetchUser();


  if (!user) {
    return <div>Loading user data or not logged in...</div>;
  }

  return (
  <div>
    <div className="flex gap-2">
      <div className="w-[60%] p-5 border rounded-md border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between">
        <div className="info">
          <h1 className="text-[30px] font-bold leading-10">Good morning,<br/> {user.first_name}</h1> 
          <p className="mt-3 font-[100] text-[13px] text-gray-500">Welcome back to your control center.</p>
          <div className="py-5">
            <Button className="rounded-lg bg-black shadow-sm shadow-black text-blue-600" href={`/farmer-dashboard/mycrops/${user.id}`}>
                Add Crops
            </Button>
          </div>
        </div>
        
        <img  
            className="w-[300px] ez-resource-show__preview__image"
            alt="Barn house with windmill and cow. Farm building concept. Vector illustration isolated on white background" 
            fetchpriority="high" 
            title="Barn house with windmill and cow. Farm building concept. Vector illustration isolated on white background" 
            draggable="false" 
            data-zoom-src="https://static.vecteezy.com/system/resources/previews/042/358/925/large_2x/barn-house-with-windmill-and-cow-farm-building-concept-illustration-isolated-on-white-background-vector.jpg" 
            data-original-width="1920" 
            data-original-height="1141" 
            data-action="click->resource-show-preview-zoom#trackZoomIn" 
            data-resource-show-preview-target="previewImage" 
            data-image-zoom-target="image" 
            src="https://static.vecteezy.com/system/resources/previews/042/358/925/large_2x/barn-house-with-windmill-and-cow-farm-building-concept-illustration-isolated-on-white-background-vector.jpg">
        </img> 
    
      </div>

      <div className="w-[40%] p-5 border rounded-md border-[rgba(0,0,0,0.1)] items-center gap-8 mb-5 justify-between">
        <h3 className="font-bold">Revenue</h3>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                showMark: false
              },
            ]}
            width={500}
            height={300}
          />
        </div>
      </div>
      <h1 className="font-bold pb-3">Exporters around you:</h1>
      <FarmerDashboardBoxes/>
      <h1>User Profile</h1>
      <p>User ID: {user.id}</p>
      <p>Email: {user.email}</p>
      <p>First Name: {user.first_name}</p>
      <p>Last Name: {user.last_name}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default FarmerDash;


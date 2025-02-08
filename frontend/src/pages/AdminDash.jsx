import React, { useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import DashboardBoxes from "../components/DashboardBoxes";
import { LineChart } from '@mui/x-charts/LineChart';

const AdminDash = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("Validating session...");
      try {
        // Fetch user info from the backend if not already set
        if (!user) {
          const response = await axios.get("http://localhost:8000/auth/validate", { withCredentials: true });
          console.log("Validation response:", response.data);
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.response?.data);
        setUser(null); // Clear user state on error
      }
    };

    fetchUserData();
  }, [setUser]);

  if (!user) {
    return <div>Loading user data or not logged in...</div>;
  }

  return (
  <div>
    <div className="flex gap-2">
      <div className="w-[60%] p-5 border rounded-md border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between">
        <div className="info">
          <h1 className="text-[30px] font-bold leading-10">Good morning,<br/> {user.first_name}</h1> 
          <p className="mt-3 font-[100] text-[13px] text-gray-500">Here is what's happening on QuikCrops today.</p>
        </div>
        
        <img class="ez-resource-show__preview__image" 
            className="w-[300px]"
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
        <h3 className="font-bold">Visitor Insights</h3>
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
      <DashboardBoxes/>
      <h1>User Profile</h1>
      <p>Email: {user.email}</p>
      <p>First Name: {user.first_name}</p>
      <p>Last Name: {user.last_name}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default AdminDash;


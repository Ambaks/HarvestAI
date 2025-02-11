import React, { useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import FarmerDashboardBoxes from "../components/DashboardBoxes";
import { PieChart } from '@mui/x-charts/PieChart';
import { Button } from "@mui/material";

const FarmerCrops = () => {
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
  <h1 className="text-black">Your Crops:</h1>

  {/* Buttons for Edit All & Delete All */}
  <div className="flex gap-4 mb-4">
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
      Edit All
    </button>
    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
      Delete All
    </button>
     {/* Create Crop Button */}
    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
        Add Crop
    </button>
  </div>

 

  {/* Crops List */}
  <div className="w-full p-5 border rounded-md border-[rgba(0,0,0,0.1)] bg-[#f1f1f1]">
    {user?.crops?.length > 0 ? (
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="text-left p-2">Amount</th>
            <th className="text-left p-2">Quality</th>
            <th className="text-left p-2">Harvest Date</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.crops.map((crop, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="p-2">{crop.amount}</td>
              <td className="p-2">{crop.quality}</td>
              <td className="p-2">{crop.harvest_date}</td>
              <td className="p-2 flex gap-2 justify-end">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="text-gray-500">No crops available.</p>
    )}
  </div>
</div>
  );
};

export default FarmerCrops;


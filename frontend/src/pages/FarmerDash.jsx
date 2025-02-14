import React, { useContext } from "react";
import FarmerDashboardBoxes from "../components/DashboardBoxes";
import { LineChart } from '@mui/x-charts/LineChart';
import { Button } from "@mui/material";
import { useFetchUser } from "../api/authService";
import { DataContext } from "../context/DataContext";

const FarmerDash = () => {
  const { user } = useFetchUser();
  const { earningsData } = useContext(DataContext);
  const chartData = {
    x: earningsData.map(entry => new Date(entry.timestamp).toLocaleDateString()),
    y: earningsData.map(entry => entry.cumulated_earnings),
  };

  if (!user) {
    return <div>Loading user data or not logged in...</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 p-6 bg-white shadow-lg rounded-2xl flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Good morning,<br /> {user.first_name}</h1>
            <p className="mt-2 text-gray-500">Start earning from your crops now!</p>
            <Button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600" href={`/farmer-dashboard/mycrops/${user.id}`}>Add Crops</Button>
          </div>
          <img className="w-40 rounded-lg shadow-sm" src="https://static.vecteezy.com/system/resources/previews/042/358/925/large_2x/barn-house-with-windmill-and-cow-farm-building-concept-illustration-isolated-on-white-background-vector.jpg" alt="Farm Illustration" />
        </div>

        <div className="p-6 bg-white shadow-lg rounded-2xl flex flex-col">
          <h3 className="font-bold mb-3">Earnings</h3>
          <LineChart
            xAxis={[{ data: chartData.x, scaleType: "point" }]}
            series={[{ data: chartData.y, showMark: true, color: "#4CAF50", area: true }]}
            width={400}
            height={250}
          />
        </div>
      </div>

      <h1 className="font-bold mt-6">Exporters around you:</h1>
      <FarmerDashboardBoxes />

      <h1 className="font-bold mt-6">Latest:</h1>
      <div className="grid grid-cols-2 gap-6 mt-4">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-3">🌾 Last Harvest</h3>
          <p>📅 Date: 13/01/2025</p>
          <p>📍 Location: Machakos, Kenya</p>
          <p>🌱 Amount Harvested: 300.00 kg</p>
          <p>🔍 Crop Quality: Grade A</p>
          <p className="mt-3">🚛 Exporter: Tony Kegode</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-3">💰 Payment Summary</h3>
          <p>✅ Received: KSh 12,500 (Exporter NAME)</p>
          <p>🕒 Pending: KSh 5,000 (Awaiting verification)</p>
          <div className="flex justify-between mt-4">
            <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">📜 View Details</Button>
            <Button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">💳 Withdraw Money</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDash;

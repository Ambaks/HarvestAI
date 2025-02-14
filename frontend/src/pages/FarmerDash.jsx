import React, { useContext } from "react";
import FarmerDashboardBoxes from "../components/DashboardBoxes";
import { LineChart } from '@mui/x-charts/LineChart';
import { Button } from "@mui/material";
import { useFetchUser } from "../api/authService";
import { DataContext } from "../context/DataContext";
import { Calendar, MapPin, Package, CheckCircle, Hourglass, FileText, CreditCard } from "lucide-react";

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

      <h1 className="text-2xl font-bold mt-6">Latest</h1>

      <div className="grid grid-cols-2 gap-6 mt-4">
        {/* Last Harvest Card */}
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
          <h3 className="font-semibold text-xl mb-4 flex items-center gap-2 text-gray-700">
            <Package className="text-[#635BFF]" size={20} /> Last Harvest
          </h3>
          <p className="text-gray-600 flex items-center gap-2">
            <Calendar className="text-[#635BFF]" size={18} /> <span className="font-semibold">Date:</span> 13/01/2025
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <MapPin className="text-[#635BFF]" size={18} /> <span className="font-semibold">Location:</span> Machakos, Kenya
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <Package className="text-[#635BFF]" size={18} /> <span className="font-semibold">Amount Harvested:</span> 300.00 kg
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <CheckCircle className="text-[#635BFF]" size={18} /> <span className="font-semibold">Crop Quality:</span> Grade A
          </p>
          <p className="mt-3 text-gray-700 font-medium flex items-center gap-2">
            <FileText className="text-[#635BFF]" size={18} /> Exporter: Tony Kegode
          </p>
        </div>

        {/* Payment Summary Card */}
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
          <h3 className="font-semibold text-xl mb-4 flex items-center gap-2 text-gray-700">
            <CreditCard className="text-[#635BFF]" size={20} /> Payment Summary
          </h3>
          <p className="text-gray-600 flex items-center gap-2">
            <CheckCircle className="text-[#635BFF]" size={18} /> <span className="font-semibold">Received:</span> KSh 12,500 (Exporter NAME)
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <Hourglass className="text-[#635BFF]" size={18} /> <span className="font-semibold">Pending:</span> KSh 5,000 (Awaiting verification)
          </p>

          <div className="flex justify-between mt-5">
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200 flex items-center gap-2">
              <FileText size={18} /> View Details
            </button>
            <button className="bg-[#635BFF] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#5f57f6] flex items-center gap-2">
              <CreditCard size={18} /> Withdraw Money
            </button>
          </div>
        </div>
      </div>
          </div>
        );
      };

export default FarmerDash;

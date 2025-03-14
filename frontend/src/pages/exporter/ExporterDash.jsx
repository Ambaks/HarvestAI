import React, { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import { LineChart } from '@mui/x-charts/LineChart';
import { useFetchUser } from "../../api/authService";
import { DataContext } from "../../context/FarmerDataContext";
import { Calendar, MapPin, Package, CheckCircle, Hourglass, FileText, CreditCard } from "lucide-react";
import { lineElementClasses, markElementClasses } from '@mui/x-charts';
import ScrollingDashboard from "../../components/ScrollingDashboard";
import ProfileCompletion from "../../components/ProfileCompletion";


const ExporterDash = () => {
  const { user } = useFetchUser();
  const { earningsData, harvests, fetchHarvests } = useContext(DataContext);
  const chartData = {
    x: earningsData.map(entry => new Date(entry.timestamp).toLocaleDateString()),
    y: earningsData.map(entry => entry.cumulated_earnings),
  };

  useEffect(() => {
      fetchHarvests(); // Refresh lastHarvest data when component renders
  }, []);


  if (!user) {
    return <div>Loading user data or not logged in...</div>;
  }

  return (
    <div className="px-1 pt-6 min-h-screen">
      <div className="grid grid-cols-3 gap-6 pb-4">
        <div className="col-span-2 p-6 bg-white shadow-lg rounded-2xl flex items-center justify-between">
          <div className="space-y-10">
            <h1 className="text-3xl leading-relaxed font-bold">Welcome back,<br /> {user.first_name}</h1>
            <p className="mt-2 text-gray-500">Start sourcing from farmers now!</p>
            <a
              href={`/exporter-dashboard/mycrops/${user.id}`}
              className="mt-4 h-[85px] opacity-[80%] w-[240px] px-4 py-2 rounded-2xl border border-[rgba(0,0,0,0.1)] shadow-lg bg-primary text-white transition-all duration-300 flex items-center justify-center"
            >
              View Crops
            </a>         
          </div>

          <ProfileCompletion/>
        </div>

      <div className="w-full h-full flex flex-col min-w-0 ">
        <div className="w-auto h-[346px] opacity-[80%] bg-white shadow-lg rounded-2xl flex flex-col relative">
          <h3 className="font-bold pl-6 pt-6">Earnings</h3>
          {/* Check if there's real data */}
          {chartData.y && chartData.y.some(value => value > 0) ? (
            <Box sx={{ width: "100%", height: "90%" }}>
            <LineChart
              xAxis={[
                {
                  data: chartData.x,
                  scaleType: "point",
                  tickLabelStyle: { fill: "#A9A9A9", fontSize: 12 },
                  stroke: "#D3D3D3",
                  lineStyle: { stroke: "#D3D3D3" },
                },
              ]}
              yAxis={[
                {
                  tickLabelStyle: { fill: "#A9A9A9", fontSize: 12 }, // Keep value labels
                  stroke: "transparent", // Hide vertical y-axis
                  lineStyle: { stroke: "transparent" }, // Ensure no axis line
                },
              ]}
              series={[
                {
                  data: chartData.y,
                  showMark: true,
                  color: "#635BFF",
                  area: true,
                  lineStyle: { stroke: "#635BFF", strokeWidth: 2 },
                },
              ]}
              grid={{
                horizontal: true, // Enable only horizontal grid lines
                vertical: false, // Disable vertical grid lines
                stroke: "#D3D3D3", // Light gray color
                strokeDasharray: "4 4", // Dashed lines
              }}
              sx={{
                width: "100%",
                height: "90%",
                [`& .${lineElementClasses.root}`]: {
                  stroke: '#8884d8',
                  strokeWidth: 2,
                },
                [`& .${markElementClasses.root}`]: {
                  stroke: '#8884d8',
                  scale: '0.6',
                  fill: '#fff',
                  strokeWidth: 2,
                },
                "& .MuiChartsAxis-root line": {
                  stroke: "transparent", // Hide all axis lines (y-axis)
                },
                "& .MuiChartsAxis-root text": {
                  fill: "#A9A9A9", // Light gray labels
                },
                "& .MuiChartsGrid-line": {
                  stroke: "#D3D3D3", // Light gray horizontal lines
                  strokeDasharray: "4 4", // Optional dashed style
                },
              }}
            />
          </Box>
          ) : (
            <div className="relative w-auto h-[250px] flex items-center justify-center">
                {/* Dummy LineChart with placeholder data */}
                <Box sx={{ width: "100%", height: "100%" }}>
                  <LineChart
                    xAxis={[{ data: ["Week 1", "Week 2", "Week 3", "Week 4", "Week5"], 
                              scaleType: "point",
                              tickLabelStyle: { fill: "#A9A9A9", fontSize: 12 },
                              stroke: "#D3D3D3",
                              lineStyle: { stroke: "#D3D3D3" }}]}

                    series={[{ data: [50, 100, 130, 150, 220], showMark: true, color: "#635BFF", area: true }]}

                    sx={{
                      width: "100%",
                      height: "90%",
                      [`& .${lineElementClasses.root}`]: {
                        stroke: '#8884d8',
                        strokeWidth: 2,
                      },
                      [`& .${markElementClasses.root}`]: {
                        stroke: '#8884d8',
                        scale: '0.6',
                        fill: '#fff',
                        strokeWidth: 2,
                      },
                      "& .MuiChartsAxis-root line": {
                        stroke: "transparent", // Hide all axis lines (y-axis)
                      },
                      "& .MuiChartsAxis-root text": {
                        fill: "#000000", // Light gray labels
                      },
                      "& .MuiChartsGrid-line": {
                        stroke: "#000000", // Light gray horizontal lines
                        strokeDasharray: "4 4", // Optional dashed style
                      },
                    }}

                    yAxis={[
                      {
                        tickLabelStyle: { fill: "#000000", fontSize: 12 }, // Keep value labels
                        stroke: "transparent", // Hide vertical y-axis
                        lineStyle: { stroke: "transparent" }, // Ensure no axis line
                      },
                    ]}

                    grid={{
                      horizontal: true, // Enable only horizontal grid lines
                      vertical: false, // Disable vertical grid lines
                      stroke: "#D3D3D3", // Light gray color
                      strokeDasharray: "4 4", // Dashed lines
                    }}

                  />
                </Box>
                {/* Watermark overlay */}
                  <div className="absolute mb-[20px] inset-0 flex items-center justify-center bg-white bg-opacity-85">
                    <p className="text-black text-xs font-semibold text-center">
                      Sell your first crops to see your earnings appear here!
                    </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ScrollingDashboard/>
      <div className="grid grid-cols-2 gap-6 mt-4 ">

        {/* Last Harvest Card */}
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
          <h3 className="font-semibold text-xl mb-4 flex items-center gap-2 text-gray-700">
            <Package className="text-[#635BFF]" size={20} /> Last Harvest
          </h3>
          <p className="text-gray-600 flex items-center gap-2">
            <Calendar className="text-primary" size={18} /> 
            <span className="font-semibold">Crop:</span> {harvests[0]?.crop_name || "N/A"}
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <Calendar className="text-primary" size={18} /> 
            <span className="font-semibold">Date:</span> {harvests[0]?.harvest_date || "N/A"}
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <MapPin className="text-primary" size={18} /> 
            <span className="font-semibold">Location:</span> {harvests[0]?.location || "N/A"}
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <Package className="text-primary" size={18} /> 
            <span className="font-semibold">Amount Harvested:</span> {harvests[0]?.quantity ? `${lastHarvest.quantity} kg` : "N/A"}
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <CheckCircle className="text-primary" size={18} /> 
            <span className="font-semibold">Crop Quality:</span> {harvests[0]?.quality || "N/A"}
          </p>
          <p className="mt-3 text-gray-700 font-medium flex items-center gap-2">
            <FileText className="text-primary" size={18} /> 
            Farmer: {harvests[0]?.exporter_name || "N/A"}
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

export default ExporterDash;

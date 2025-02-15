import { Box, Typography, Card } from "@mui/material";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";

export default function FutureAIFeatures() {
  return (
    <section className="mt-10 px-6">
      {/* Title and Description */}
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Future AI-Powered Capabilities
      </Typography>
      <Typography variant="body1" className="text-gray-600 mb-6">
        QuikCrops is developing AI-driven insights to help farmers make better decisions.
      </Typography>

      {/* Charts Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Weather Predictions (Line Chart) */}
        <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl rounded-2xl p-5">
          <Typography variant="h6" className="font-semibold text-white mb-2">
            Weather Predictions 🌦️
          </Typography>
          <LineChart
            xAxis={[{ data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], scaleType: "point" }]}
            series={[{ data: [20, 22, 25, 23, 21, 24, 26], color: "#fff" }]}
            sx={{ width: "100%", height: 250 }}
          />
        </Card>

        {/* Soil Humidity Levels (Bar Chart) */}
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl rounded-2xl p-5">
          <Typography variant="h6" className="font-semibold text-white mb-2">
            Soil Humidity Levels 💧
          </Typography>
          <BarChart
            xAxis={[{ scaleType: "band", data: ["Field A", "Field B", "Field C", "Field D"] }]}
            series={[{ data: [45, 60, 75, 50], color: "#fff" }]}
            sx={{ width: "100%", height: 250 }}
          />
        </Card>

        {/* Crop Health Predictions (Pie Chart) */}
        <Card className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-xl rounded-2xl p-5">
          <Typography variant="h6" className="font-semibold text-white mb-2">
            Crop Health Predictions 🌱
          </Typography>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 65, label: "Healthy" },
                  { id: 1, value: 25, label: "At Risk" },
                  { id: 2, value: 10, label: "Needs Attention" },
                ],
                colors: ["#22c55e", "#eab308", "#dc2626"],
              },
            ]}
            width={300}
            height={250}
          />
        </Card>
      </div>
    </section>
  );
}
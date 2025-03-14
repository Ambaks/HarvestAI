import { useState } from "react";
import { Package, Leaf, Calendar } from "lucide-react";

const inventoryData = [
  { id: 1, farm: "Green Acres", location: "Nairobi, Kenya", crop: "Avocado", quantity: 1000, status: "Harvested", harvestDate: "2025-02-10" },
  { id: 2, farm: "Sunrise Fields", location: "Mombasa, Kenya", crop: "Mango", quantity: 500, status: "Growing", harvestDate: "2025-04-15" },
  { id: 3, farm: "Tropical Harvests", location: "Kisumu, Kenya", crop: "Pineapple", quantity: 750, status: "Harvested", harvestDate: "2025-02-18" },
  { id: 4, farm: "AgriWorld", location: "Eldoret, Kenya", crop: "Banana", quantity: 1200, status: "Growing", harvestDate: "2025-05-10" },
  { id: 5, farm: "Fresh Harvest", location: "Nakuru, Kenya", crop: "Avocado", quantity: 800, status: "Harvested", harvestDate: "2025-02-08" },
  { id: 6, farm: "Golden Fields", location: "Thika, Kenya", crop: "Coffee", quantity: 1500, status: "Harvested", harvestDate: "2025-01-30" },
  { id: 7, farm: "Sunny Orchard", location: "Malindi, Kenya", crop: "Coconut", quantity: 900, status: "Growing", harvestDate: "2025-06-20" },
  { id: 8, farm: "Riverbank Farms", location: "Machakos, Kenya", crop: "Tomato", quantity: 1300, status: "Harvested", harvestDate: "2025-02-12" },
  { id: 9, farm: "Green Hills", location: "Nanyuki, Kenya", crop: "Strawberry", quantity: 600, status: "Growing", harvestDate: "2025-05-25" },
  { id: 10, farm: "Bright Harvest", location: "Naivasha, Kenya", crop: "Grapes", quantity: 700, status: "Harvested", harvestDate: "2025-02-14" },
  { id: 11, farm: "Sunset Farms", location: "Kakamega, Kenya", crop: "Sugarcane", quantity: 2200, status: "Growing", harvestDate: "2025-08-10" },
  { id: 12, farm: "Pure Agri", location: "Embu, Kenya", crop: "Tea", quantity: 1750, status: "Harvested", harvestDate: "2025-01-29" },
  { id: 13, farm: "Golden Palm", location: "Kilifi, Kenya", crop: "Cashew", quantity: 500, status: "Growing", harvestDate: "2025-09-15" },
  { id: 14, farm: "Blue Sky Farms", location: "Narok, Kenya", crop: "Wheat", quantity: 3000, status: "Harvested", harvestDate: "2025-02-05" },
  { id: 15, farm: "Horizon Agri", location: "Kitale, Kenya", crop: "Maize", quantity: 3500, status: "Growing", harvestDate: "2025-07-20" },
  { id: 16, farm: "Orchard Bliss", location: "Nyeri, Kenya", crop: "Apple", quantity: 450, status: "Growing", harvestDate: "2025-06-15" },
  { id: 17, farm: "Valley Farms", location: "Kericho, Kenya", crop: "Tea", quantity: 2000, status: "Harvested", harvestDate: "2025-01-18" },
  { id: 18, farm: "Evergreen Fields", location: "Murang'a, Kenya", crop: "Macadamia", quantity: 820, status: "Growing", harvestDate: "2025-09-10" },
  { id: 19, farm: "Spring Valley", location: "Kisii, Kenya", crop: "Banana", quantity: 900, status: "Harvested", harvestDate: "2025-02-22" },
  { id: 20, farm: "Highland Agri", location: "Meru, Kenya", crop: "Coffee", quantity: 1400, status: "Growing", harvestDate: "2025-10-05" },
  { id: 21, farm: "Pure Harvest", location: "Migori, Kenya", crop: "Papaya", quantity: 1100, status: "Harvested", harvestDate: "2025-02-07" },
  { id: 22, farm: "Fertile Lands", location: "Garissa, Kenya", crop: "Melon", quantity: 780, status: "Growing", harvestDate: "2025-04-20" },
  { id: 23, farm: "Sunbeam Farms", location: "Wajir, Kenya", crop: "Peanut", quantity: 600, status: "Harvested", harvestDate: "2025-02-13" },
  { id: 24, farm: "Silver Fields", location: "Turkana, Kenya", crop: "Sorghum", quantity: 1700, status: "Growing", harvestDate: "2025-11-15" },
  { id: 25, farm: "Lush Green", location: "Taita Taveta, Kenya", crop: "Passion Fruit", quantity: 530, status: "Harvested", harvestDate: "2025-02-04" },
  { id: 26, farm: "Verdant Harvests", location: "Baringo, Kenya", crop: "Onion", quantity: 1250, status: "Growing", harvestDate: "2025-07-30" },
  { id: 27, farm: "Prime Agri", location: "Laikipia, Kenya", crop: "Soybean", quantity: 2900, status: "Harvested", harvestDate: "2025-02-15" },
  { id: 28, farm: "Pioneer Farms", location: "Samburu, Kenya", crop: "Sesame", quantity: 900, status: "Growing", harvestDate: "2025-10-12" },
  { id: 29, farm: "Timberland Agri", location: "Marsabit, Kenya", crop: "Cotton", quantity: 2300, status: "Harvested", harvestDate: "2025-02-19" },
  { id: 30, farm: "Desert Bloom", location: "Isiolo, Kenya", crop: "Dates", quantity: 1800, status: "Growing", harvestDate: "2025-12-05" },
];

export default function ExporterMarketplace() {
    const [view, setView] = useState("Harvested");

    const filteredData = inventoryData.filter((item) => item.status === view);

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold flex items-center gap-2 text-black">
                    <Package size={28} /> Marketplace
                </h1>
                <div className="flex gap-4">
                    <button
                        className={`p-2 border rounded-lg transition-transform duration-200 hover:scale-105 ${view === "Harvested" ? "bg-[#635BFF] text-white" : ""}`}
                        onClick={() => setView("Harvested")}
                    >
                        Harvested Crops
                    </button>
                    <button
                        className={`p-2 border rounded-lg transition-transform duration-200 hover:scale-105 ${view === "Growing" ? "bg-[#635BFF] text-white" : ""}`}
                        onClick={() => setView("Growing")}
                    >
                        Growing Crops
                    </button>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((item) => (
                    <div
                        key={item.id}
                        className="border p-6 rounded-2xl shadow-lg space-y-4 bg-white"
                    >
                        <h2 className="text-xl font-semibold flex items-center gap-2 text-black">
                            <Leaf size={20} /> {item.farm}
                        </h2>
                        <p className="text-gray-700">🌍 Location: {item.location}</p>
                        <p className="text-gray-700">🌱 Crop: {item.crop}</p>
                        <p className="text-gray-700">📦 Quantity: {item.quantity} kg</p>
                        <p className="flex items-center gap-2 text-gray-700">
                            <Calendar size={18} className="text-[#635BFF]" /> Harvest Date: {new Date(item.harvestDate).toDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

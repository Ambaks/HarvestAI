import { useState } from "react";
import { Package, Filter, ShoppingCart, Calendar, DollarSign, Info, CheckCircle } from "lucide-react";

const marketplaceData = [
    { id: 1, exporter: "ExpoCorp", location: "Nairobi, Kenya", rating: 4.8, crop: "Avocado", quantity: 1000, price: 2.5, dueDate: "2025-03-10" },
    { id: 2, exporter: "GreenTrade", location: "Mombasa, Kenya", rating: 4.5, crop: "Mango", quantity: 500, price: 3.0, dueDate: "2025-03-15" },
    { id: 3, exporter: "FarmDirect", location: "Kisumu, Kenya", rating: 4.6, crop: "Pineapple", quantity: 750, price: 2.8, dueDate: "2025-03-18" },
    { id: 4, exporter: "AgriWorld", location: "Eldoret, Kenya", rating: 4.7, crop: "Banana", quantity: 1200, price: 1.8, dueDate: "2025-03-22" },
    { id: 5, exporter: "FreshHarvest", location: "Nakuru, Kenya", rating: 4.3, crop: "Avocado", quantity: 800, price: 2.7, dueDate: "2025-03-08" },
    { id: 6, exporter: "TropicalExports", location: "Kisumu, Kenya", rating: 4.9, crop: "Papaya", quantity: 600, price: 3.5, dueDate: "2025-03-12" },
    { id: 7, exporter: "Sunrise Foods", location: "Machakos, Kenya", rating: 4.2, crop: "Passion Fruit", quantity: 900, price: 4.0, dueDate: "2025-03-20" },
    { id: 8, exporter: "PrimeAgro", location: "Kericho, Kenya", rating: 4.4, crop: "Tea Leaves", quantity: 1500, price: 5.2, dueDate: "2025-03-25" },
    { id: 9, exporter: "Kenya Greens", location: "Nairobi, Kenya", rating: 4.6, crop: "Spinach", quantity: 1300, price: 2.2, dueDate: "2025-03-16" },
    { id: 10, exporter: "HarvestLink", location: "Thika, Kenya", rating: 4.5, crop: "Tomatoes", quantity: 1100, price: 1.9, dueDate: "2025-03-14" },
    { id: 11, exporter: "Nature's Best", location: "Malindi, Kenya", rating: 4.7, crop: "Cashew Nuts", quantity: 700, price: 6.0, dueDate: "2025-03-30" },
    { id: 12, exporter: "GreenGold", location: "Meru, Kenya", rating: 4.8, crop: "Macadamia Nuts", quantity: 500, price: 7.5, dueDate: "2025-03-28" },
];

export default function MarketplaceDashboard() {
  const [cropFilter, setCropFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState("Price");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [supplyType, setSupplyType] = useState("full");
  const [customQuantity, setCustomQuantity] = useState("");
  const [appliedOrders, setAppliedOrders] = useState(new Set());
  const [selectedDetails, setSelectedDetails] = useState(null)

  const openModal = (order) => {
    setSelectedOrder(order);
    setSupplyType("full");
    setCustomQuantity("");
  };

  const openDetailsModal = (order) => {
    setSelectedDetails(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setSelectedDetails(null);
  };

  const handleApply = () => {
    if (selectedOrder) {
      setAppliedOrders(new Set([...appliedOrders, selectedOrder.id]));
      closeModal();
    }
  };

  const filteredData = marketplaceData.filter(
    (item) => cropFilter === "All" || item.crop === cropFilter
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sort === "Price") return a.price - b.price;
    if (sort === "Quantity") return b.quantity - a.quantity;
    if (sort === "Due Date") return new Date(a.dueDate) - new Date(b.dueDate);
    return 0;
  });

  const uniqueCrops = ["All", ...new Set(marketplaceData.map((item) => item.crop))];

  return (
    <div className="p-6">

    {/* Header */}
    <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold flex items-center gap-2 text-black">
        <Package size={28} /> Marketplace
    </h1>
    <div className="flex gap-4 relative">
        <button
        className="p-2 border rounded-lg transition-transform duration-200 hover:scale-105 flex items-center gap-2"
        onClick={() => setFilterOpen(!filterOpen)}
        >
        <Filter size={18} className="text-[#635BFF]" /> Filter
        </button>
        {filterOpen && (
        <div className="absolute top-full left-0 bg-white border rounded-lg shadow-lg p-2 w-40">
            <select
            className="p-2 border rounded-lg w-full"
            onChange={(e) => setCropFilter(e.target.value)}
            value={cropFilter}
            >
            {uniqueCrops.map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
            ))}
            </select>
        </div>
        )}
        <select
        className="p-2 border rounded-lg transition-transform duration-200 hover:scale-105 flex items-center gap-2"
        onChange={(e) => setSort(e.target.value)}
        >
        <option value="Price" className="flex items-center gap-2">
            <DollarSign size={16} className="text-[#635BFF]" /> Sort by Price
        </option>
        <option value="Quantity" className="flex items-center gap-2">
            <Package size={16} className="text-[#635BFF]" /> Sort by Quantity
        </option>
        <option value="Due Date" className="flex items-center gap-2">
            <Calendar size={16} className="text-[#635BFF]" /> Sort by Due Date
        </option>
        </select>
    </div>
    </div>

    {/* Cards Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {sortedData.map((item) => (
        <div
        key={item.id}
        className="border p-6 rounded-2xl shadow-lg space-y-4 bg-white"
        >
        <h2 className="text-xl font-semibold flex items-center gap-2 text-black">
            <Package size={20} /> {item.exporter}
        </h2>
        <p className="flex items-center gap-2 text-gray-700">
            <ShoppingCart size={18} className="text-[#635BFF]" /> Crop: {item.crop}
        </p>
        <p className="flex items-center gap-2 text-gray-700">
            <Package size={18} className="text-[#635BFF]" /> Quantity: {item.quantity} kg
        </p>
        <p className="flex items-center gap-2 text-gray-700">
            <DollarSign size={18} className="text-[#635BFF]" /> Price: ${item.price}/kg
        </p>
        <p className="flex items-center gap-2 text-gray-700">
            <Calendar size={18} className="text-[#635BFF]" /> Due Date: {new Date(item.dueDate).toDateString()}
        </p>
        <div className="flex gap-3">
            <button
            className="px-4 py-2 bg-gray-300 shadow-md rounded-lg transition-transform duration-200 hover:scale-105 flex items-center gap-2"
            onClick={() => openDetailsModal(item)}
            >
            <Info size={16} className="text-[#635BFF]" /> View Details
            </button>
            {appliedOrders.has(item.id) ? (
            <button className="px-4 py-2 bg-gray-400 shadow-md text-white rounded-lg flex items-center gap-2 cursor-not-allowed">
                <CheckCircle size={16} className="text-white" /> Applied
            </button>
            ) : (
            <button
                className="px-4 py-2 bg-[#635BFF] shadow-md text-white rounded-lg transition-transform duration-200 hover:scale-105 flex items-center gap-2"
                onClick={() => openModal(item)}
            >
                <CheckCircle size={16} className="text-white" /> Apply
            </button>
            )}
        </div>
        </div>
    ))}
    </div>

    {/* View Details Modal */}
    {selectedDetails && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-2xl w-[500px]">
                {/* Exporter Information (Top Half) */}
                <div className="text-center mb-4">
                <h2 className="text-xl font-semibold mb-2">🌍 {selectedDetails.exporter}</h2>
                <p>📍 Location: {selectedDetails.location}</p>
                <p>⭐ Rating: {selectedDetails.rating} / 5</p>
                </div>

                <hr className="border-gray-300 my-4" />

                {/* Order Details (Bottom Half) */}
                <div>
                <p><strong>🥑 Crop:</strong> {selectedDetails.crop}</p>
                <p><strong>📦 Quantity:</strong> {selectedDetails.quantity} kg</p>
                <p><strong>💰 Price:</strong> ${selectedDetails.price}/kg</p>
                <p><strong>⏳ Due Date:</strong> {new Date(selectedDetails.dueDate).toDateString()}</p>
                </div>

                {/* Close Button */}
                <div className="flex justify-center mt-6">
                <button
                    className="px-4 py-2 bg-gray-300 rounded-lg transition-transform duration-200 hover:scale-105"
                    onClick={closeModal}
                >
                    ❌ Close
                </button>
                </div>
            </div>
            </div>
        )}

      {/* Apply Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-96">
            {/* Modal Header */}
            <h2 className="text-xl font-semibold text-center mb-4">📌 Apply for Order</h2>

            {/* Order Details */}
            <div className="space-y-2 border-b pb-4">
              <p><strong>🌍 Exporter:</strong> {selectedOrder.exporter}</p>
              <p><strong>🥑 Crop:</strong> {selectedOrder.crop}</p>
              <p><strong>📦 Quantity:</strong> {selectedOrder.quantity} kg</p>
              <p><strong>💰 Price:</strong> ${selectedOrder.price}/kg</p>
              <p><strong>⏳ Due Date:</strong> {new Date(selectedOrder.dueDate).toDateString()}</p>
            </div>

            {/* Supply Selection */}
            <div className="mt-4">
              <p className="font-medium mb-2">How much will you supply?</p>
              <div className="flex gap-3">
                <button
                  className={`px-4 py-2 border rounded-lg transition-transform duration-200 hover:scale-105 ${
                    supplyType === "full" ? "bg-green-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setSupplyType("full")}
                >
                  🔹 Full Order
                </button>
                <button
                  className={`px-4 py-2 border rounded-lg transition-transform duration-200 hover:scale-105 ${
                    supplyType === "part" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setSupplyType("part")}
                >
                  ✏️ Part Order
                </button>
              </div>

              {supplyType === "part" && (
                <input
                  type="number"
                  placeholder="Enter quantity (kg)"
                  className="mt-3 p-2 border rounded-lg w-full"
                  value={customQuantity}
                  onChange={(e) => setCustomQuantity(e.target.value)}
                />
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button className="px-4 py-2 bg-gray-300 rounded-lg transition-transform duration-200 hover:scale-105" onClick={closeModal}>
                ❌ Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg transition-transform duration-200 hover:scale-105"
                onClick={handleApply}
              >
                ✅ Confirm Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
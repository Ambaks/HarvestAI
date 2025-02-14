import { useState } from "react";

const marketplaceData = [
  { exporter: "ExpoCorp", crop: "Avocado", quantity: 1000, price: 2.5, dueDate: "Mar 10", status: "Open" },
  { exporter: "GreenTrade", crop: "Mango", quantity: 500, price: 3.0, dueDate: "Mar 15", status: "Open" },
  { exporter: "FreshFruit", crop: "Bananas", quantity: 2000, price: 1.8, dueDate: "Mar 20", status: "Closed" },
  { exporter: "FarmDirect", crop: "Pineapple", quantity: 750, price: 2.8, dueDate: "Mar 18", status: "Open" },
  { exporter: "AgroWorld", crop: "Grapes", quantity: 1200, price: 2.6, dueDate: "Mar 22", status: "Closed" },
  { exporter: "PureHarvest", crop: "Coconuts", quantity: 900, price: 3.1, dueDate: "Mar 25", status: "Open" },
];

export default function FarmerMarketplace() {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Price");

  const filteredData = marketplaceData.filter(
    (item) => filter === "All" || item.status === filter
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sort === "Price") return a.price - b.price;
    if (sort === "Quantity") return b.quantity - a.quantity;
    return 0;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📌 Marketplace</h1>
        <div className="flex gap-4">
          <select
            className="p-2 border rounded-lg"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">🔽 Filter: All</option>
            <option value="Open">✅ Open Orders</option>
            <option value="Closed">❌ Closed Orders</option>
          </select>

          <select
            className="p-2 border rounded-lg"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="Price">🔼 Sort by Price</option>
            <option value="Quantity">🔼 Sort by Quantity</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedData.map((item, index) => (
          <div
            key={index}
            className="border p-4 rounded-2xl shadow-lg space-y-3 bg-white"
          >
            <h2 className="text-xl font-semibold">🌍 {item.exporter}</h2>
            <p>🥑 Crop: {item.crop}</p>
            <p>📦 Quantity: {item.quantity} kg</p>
            <p>💰 Price: ${item.price}/kg</p>
            <p>⏳ Due Date: {item.dueDate}</p>
            <p className={item.status === "Open" ? "text-green-600" : "text-red-600"}>
              {item.status === "Open" ? "✅ Open" : "❌ Closed"}
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-300 rounded-lg">📜 View Details</button>
              {item.status === "Open" && (
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
                  ✅ Apply
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
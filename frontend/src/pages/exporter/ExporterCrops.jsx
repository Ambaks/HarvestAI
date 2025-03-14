import React, { useState } from "react";
import { Alert, Button } from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";
import { useData } from "../../context/FarmerDataContext";



const ExporterCrops = ({ setSelectedCrop, setEditCropModal, setDeleteCropModal }) => {

  const {exporterCrops, setExporterCrops} = useData();

  const [orders] = useState([
    { id: 1023, crop: "Avocado (Hass)", required: 1500, available: 2000, deliveryDate: "Mar 02, 2025" },
    { id: 1024, crop: "Mango (Kent)", required: 2000, available: 1500, deliveryDate: "Mar 05, 2025" },
    { id: 1025, crop: "Avocado (Fuerte)", required: 1000, available: 800, deliveryDate: "Mar 10, 2025" },
  ]);

  const [inventory] = useState([
    { id: 1, name: "Avocado", variety: "Hass", quality: "Premium", quantity: 2000, availableFrom: "Feb 25, 2025", supplier: "Farm A", status: "Ready" },
    { id: 2, name: "Mango", variety: "Kent", quality: "Standard", quantity: 1500, availableFrom: "Mar 01, 2025", supplier: "Farm B", status: "In Transit" },
    { id: 3, name: "Avocado", variety: "Fuerte", quality: "Premium", quantity: 800, availableFrom: "Feb 28, 2025", supplier: "Farm C", status: "Pending Quality Check" },
  ]);


  return (
      <div>
      <div className="flex space-x-4 w-full p-5">
        {/* Current Inventory */}
        <div className="w-3/4 p-5 border rounded-2xl border-gray-200 bg-white shadow-md">
            <h2 className="text-xl font-semibold mb-4">🌾 Current Inventory</h2>
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-3 rounded-tl-xl">Crop Name</th>
                  <th className="p-3">Variety</th>
                  <th className="p-3">Quality</th>
                  <th className="p-3">Quantity (kg)</th>
                  <th className="p-3">Available From</th>
                  <th className="p-3">Supplier</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 rounded-tr-xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.variety}</td>
                    <td className="p-3">{item.quality}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">{item.availableFrom}</td>
                    <td className="p-3">{item.supplier}</td>
                    <td className="p-3 text-center">
                      <span className="block w-24 px-3 py-1 rounded-md text-white text-center bg-gray-400">{item.status}</span>
                    </td>
                    <td className="p-3 flex items-center gap-2">
                      <button onClick={() => { setSelectedCrop(item); setEditCropModal(true); }} className="bg-primary text-white px-3 py-2 rounded-md shadow-md flex items-center gap-2 hover:bg-[#5A4ABB] transition">
                        <Pencil size={16} /> 
                      </button>
                      <button onClick={() => { setSelectedCrop(item); setDeleteCropModal(true); }} className="bg-red-500 text-white px-3 py-2 rounded-md shadow-md flex items-center gap-2 hover:bg-red-600 transition">
                        <Trash2 size={16} /> 
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      
        {/* Order alerts Section */}
        <div className="w-1/4 p-5 border rounded-2xl border-[rgba(0,0,0,0.1)] bg-white bg-opacity-5 shadow-md">
          <h2 className="text-xl font-semibold mb-4">📦 Order Alerts</h2>
          {orders.map((order) => (
            <Alert key={order.id} severity={order.required > order.available ? "warning" : "success"} className="mb-2">
              Order #{order.id} requires {order.required}kg of {order.crop}, Available: {order.available}kg
            </Alert>
          ))}
        </div>
      </div>

      <div className="flex space-x-4 w-full p-5">
      {/* Upcoming Harvests section */}
      <div className="w-full p-5 border rounded-2xl border-gray-200 bg-white shadow-md backdrop-blur-md relative">
        <h2 className="text-xl font-semibold mt-6 mb-4">📊 Upcoming Harvests</h2>
        {exporterCrops.length === 0 ? (
          <p className="text-gray-500 text-center italic py-10">
            Upcoming harvests will appear here as soon as you reach an agreement with a farmer.
          </p>
        ) : (
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3 rounded-tl-xl">Supplier</th>
                <th className="text-left p-3">Crop</th>
                <th className="text-left p-3">Expected Yield (kg)</th>
                <th className="text-left p-3">Availability Date</th>
                <th className="text-left p-3 rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exporterCrops.map((harvest, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition">
                  <td className="p-3">{harvest.supplier}</td>
                  <td className="p-3">{harvest.crop}</td>
                  <td className="p-3">{harvest.yield}</td>
                  <td className="p-3">{harvest.availability}</td>
                  <td className="p-3 flex items-center gap-2">
                    <button 
                      onClick={() => { setSelectedHarvest(harvest); setEditHarvestModal(true); }}
                      className="bg-primary text-white px-3 py-2 rounded-md shadow-md flex items-center gap-2 hover:bg-[#5A4ABB] transition"
                    >
                      <Pencil size={16} />
                    </button>
                    <button 
                      onClick={() => { setSelectedHarvest(harvest); setDeleteHarvestModal(true); }}
                      className="bg-red-500 text-white px-3 py-2 rounded-md shadow-md flex items-center gap-2 hover:bg-red-600 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>

      <div className="flex space-x-4 w-full p-5">
        {/*Order Requirements Details section*/}
        <div className="w-full p-5 border rounded-2xl border-gray-200 shadow-md">
          <div className=" flex justify-between mt-3 mb-4">
          <h2 className="text-xl font-semibold">📦 Your order deadlines</h2>
          <a className=" text-white px-3 py-2 rounded-md shadow-md flex items-center gap-2 bg-primary">Add</a>
          </div>
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3 rounded-tl-xl">Order ID</th>
                <th className="text-left p-3">Crop</th>
                <th className="text-left p-3">Required Quantity (kg)</th>
                <th className="text-left p-3">Available Quantity (kg)</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3 rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                  <td className="p-3">#{order.id}</td>
                  <td className="p-3">{order.crop}</td>
                  <td className="p-3">{order.required}</td>
                  <td className="p-3">{order.available}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-md text-white ${order.required > order.available ? "bg-red-500" : "bg-green-500"}`}>
                      {order.required > order.available ? "Insufficient" : "Sufficient"}
                    </span>
                  </td>
                  <td className="p-3 flex items-center gap-2">
                      <button onClick={() => { setSelectedDeadline(item); setEditDeadlineModal(true); }} className="bg-primary text-white px-3 py-2 rounded-md shadow-md flex items-center gap-2 hover:bg-[#5A4ABB] transition">
                        <Pencil size={16} /> 
                      </button>
                      <button onClick={() => { setSelectedDeadline(item); setDeleteDeadlineModal(true); }} className="bg-red-500 text-white px-3 py-2 rounded-md shadow-md flex items-center gap-2 hover:bg-red-600 transition">
                        <Trash2 size={16} /> 
                      </button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  </div>
    
  );
};

export default ExporterCrops;
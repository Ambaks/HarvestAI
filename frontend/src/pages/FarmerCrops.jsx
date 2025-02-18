import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFetchUser } from "../api/authService";
import { X, Pencil, Calendar, Leaf, CheckCircle, PlusCircle, Check, Trash2 } from "lucide-react";
import { useData } from "../context/FarmerDataContext";
import { motion } from "framer-motion";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

const FarmerCrops = () => {
  const { user } = useFetchUser();
  const {crops, setCrops, fetchCrops, harvests, setHarvests, fetchHarvests} = useData();


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Weight, setWeight] = useState("");
  const [harvestDate, setHarvestDate] = useState(new Date().toISOString().split("T")[0]);
  const [cropQuality, setCropQuality] = useState("Grade A");
  const [cropName, setCropName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);


  const [editCropModal, setEditCropModal] = useState(false);
  const [editHarvestModal, setEditHarvestModal] = useState(false);
  const [deleteCropModal, setDeleteCropModal] = useState(false);
  const [deleteHarvestModal, setDeleteHarvestModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [selectedHarvest, setSelectedHarvest] = useState(null);


  const handleSubmit = async () => {
    if (!Weight) {
      setError("Please enter a valid weight.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("farmer_id", user?.id); // Ensure the user ID is included
    formData.append("quantity", Weight);
    formData.append("date", harvestDate);
    formData.append("crop_name", cropName);
    formData.append("quality", cropQuality);




    try {
      const response = await axios.post(`${API_BASE_URL}/harvests/crops/new`, // Replace with your actual backend API
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Ensure HTTP-only cookies are sent
        }
      );

      console.log("Harvest submitted successfully:", response.data);
      setIsModalOpen(false);
      fetchCrops();
      fetchHarvests();
      setWeight("");
    } catch (err) {
      console.error("Error submitting harvest:", err);
      setError("Failed to submit harvest. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleCropEdit = async () => {
    try {
      const updatedData = {
        crop_name: selectedCrop.crop_name,
        quantity: parseFloat(selectedCrop.quantity), // Convert to float
        quality: selectedCrop.quality,
        date: selectedCrop.date,
        
      };
  
      // The id is only used in the URL, not in the request body
      await axios.put(`${API_BASE_URL}/harvests/crops/`, updatedData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Ensure HTTP-only cookies are sent
        params: { crop_id: selectedCrop?.id }
      });
  
      setCrops(crops.map(crop => (crop.id === selectedCrop.id ? { ...crop, ...updatedData } : crop)));
      setEditCropModal(false);
    } catch (error) {
      console.error("Error updating crop:", error);
    }
  };

  const handleHarvestEdit = async () => {
    try {
      const updatedHarvestData = {
        crop_name: selectedHarvest.crop_name,
        quantity: parseFloat(selectedHarvest.quantity), // Convert to float
        quality: selectedHarvest.quality,
        date: selectedHarvest.date,
        
      };
  
      // The id is only used in the URL, not in the request body
      await axios.put(`${API_BASE_URL}/harvests/`, updatedHarvestData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Ensure HTTP-only cookies are sent
        params: { harvest_id: selectedHarvest?.id }
      });
  
      setHarvests(harvests.map(harvest => (harvest.id === selectedHarvest.id ? { ...harvest, ...updatedHarvestData } : harvest)));
      setEditHarvestModal(false);
    } catch (error) {
      console.error("Error updating crop:", error);
    }
  };


  const handleCropDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/harvests/crops/`, {withCredentials: true, // Ensure HTTP-only cookies are sent
        params: { crop_id: selectedCrop?.id }});
      setCrops(crops.filter(crop => crop.id !== selectedCrop.id));
      setDeleteCropModal(false);
    } catch (error) {
      console.error("Error deleting crop:", error);
    }
  };

  const handleHarvestDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/harvests`, {withCredentials: true, // Ensure HTTP-only cookies are sent
        params: { harvest_id: selectedHarvest?.id }});
      setHarvests(harvests.filter(harvest => harvest.id !== selectedHarvest.id));
      setDeleteHarvestModal(false);
    } catch (error) {
      console.error("Error deleting crop:", error);
    }
  };



  const handleHarvestNow = async (crop) => {
    try {
      console.log("Crop:", crop)
      // Define payload based on HarvestBase schema
      const payload = {
        crop_name: crop.crop_name || "Unknown",
        farmer_id: user.id,
        crop_id: crop.id,
        quantity: crop.quantity || 0, // Replace with actual value
        quality: crop.quality || "Pesticide", // Replace with actual value
        harvest_date: new Date().toISOString().split("T")[0], // Current date
        status: "Pending", // Default status
      };
      axios.post(`${API_BASE_URL}/harvests/new`, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
  
      await fetchCrops();
      await fetchHarvests();
      setCrops(prevCrops => prevCrops.filter(c => c.id !== crop.id));
    } catch (error) {
      console.error("Error harvesting crop:", error);
    }
  };

  return (
    <div >
      
      <div className="bg-[#F8F7FC] shadow-md rounded-2xl p-6 mb-6">
        <h1 className="text-2xl font-semibold text-black mb-4">Your Crops</h1>
        <div className="flex justify-between">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-lg shadow-md hover:bg-[#5A4ABB] transition duration-300"
          >
            <PlusCircle size={20} className="text-white" />
            Add Crop
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed z-[99] inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[460px] h-auto">
            <div className="flex justify-center items-center mb-4">
              <h2 className="text-2xl font-semibold text-[#000]">Record New Harvest</h2>
            </div>

            <div className="space-y-8">
              {/* Manual Entry */}
              <label className="block">
                <span className="flex items-center gap-2 text-primary font-medium">
                  <Pencil size={18} /> Manual Entry:
                </span>
                <input
                  type="number"
                  value={Weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md focus:ring-primary focus:border-primary"
                  placeholder="Enter weight in kg"
                  required
                />
              </label>

              {/* Crop Name */}
              <label className="block">
                <span className="flex items-center gap-2 text-primary font-medium">
                  <Leaf size={18} /> Crop:
                </span>
                <input
                  type="text"
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md focus:ring-primary focus:border-primary"
                  placeholder="What are you selling?"
                  required
                />
              </label>

              {/* Harvest Date */}
              <label className="block">
                <span className="flex items-center gap-2 text-primary font-medium">
                  <Calendar size={18} /> Harvest Date:
                </span>
                <input
                  type="date"
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md focus:ring-primary focus:border-primary"
                  required
                />
              </label>

              {/* Crop Quality */}
              <label className="block">
                <span className="flex items-center gap-2 text-primary font-medium">
                  <CheckCircle size={18} /> Crop Quality:
                </span>
                <select
                  value={cropQuality}
                  onChange={(e) => setCropQuality(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md focus:ring-primary focus:border-primary"
                  required
                >
                  <option value="Grade A">Grade A</option>
                  <option value="Tier B">Tier B</option>
                  <option value="Tier C">Tier C</option>
                </select>
              </label>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Buttons */}
              <div className="flex justify-center gap-3 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-500 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className={`bg-primary text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-[#5A4ABB] transition duration-300 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : (
                    <>
                      <CheckCircle size={18} /> Submit Harvest
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full p-5 border rounded-2xl border-gray-200 bg-gray-50 shadow-md">
        {crops?.length > 0 ? (
        <div className="w-full">
          <table className="w-full table-fixed border-collapse">
            {/* Table Header */}
            <thead className="w-full">
              <tr className="bg-primary text-white w-full">
                <th className="text-left p-3 w-1/5">Crop</th>
                <th className="text-left p-3 w-1/5">Amount (kg)</th>
                <th className="text-left p-3 w-1/5">Organic Grade</th>
                <th className="text-left p-3 w-1/5">Harvest Date</th>
                <th className="text-left p-3 w-1/5">Status</th>
                <th className="text-left p-3 w-1/5">Actions</th>
              </tr>
            </thead>
        
            {/* Table Body */}
            <tbody>
            {crops.map((crop) => {
                  const isHarvestToday = crop.date === new Date().toISOString().split("T")[0];
                  return (
                    <tr key={crop.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                      <td className="p-3">{crop.crop_name}</td>
                      <td className="p-3">{crop.quantity}</td>
                      <td className="p-3">{crop.quality}</td>
                      <td className="p-3">
                        {isHarvestToday ? (
                        <motion.button
                          onClick={() => handleHarvestNow(crop)}
                          className="bg-[#ffca4f] text-white px-3 py-2 w-[110px] text-sm rounded-2xl shadow-md hover:bg-[#d5a942] transition"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
                        >
                          Harvest
                       </motion.button>
                        ) : (
                          crop.date
                        )}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-md text-white ${
                            crop.status === "Harvested" ? "bg-green-500" : crop.status === "Pending" ? "bg-yellow-500" : "bg-gray-400"
                          }`}
                        >
                          {crop.status}
                        </span>
                      </td>
                      <td className="p-3 flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedCrop(crop);
                            setEditCropModal(true);
                          }}
                          className="bg-primary text-white px-3 py-2 rounded-md shadow-md flex items-center gap-2 hover:bg-[#5A4ABB] transition"
                        >
                          <Pencil size={16} /> Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCrop(crop);
                            setDeleteCropModal(true);
                          }}
                          className="bg-red-500 text-white px-3 py-2 rounded-md shadow-md flex items-center gap-2 hover:bg-red-600 transition"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
                </tbody>
          </table>
        </div>
        ) : (
          <div className="text-gray-500 text-center py-6">
            <p>No crops recorded yet.</p>
          </div>
        )}
      </div>
      
      {editCropModal && (
        <div className="fixed z-[99] inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-2xl space-y-9 shadow-lg w-[420px]">
            <h2 className="text-xl font-semibold text-primary flex justify-center text-center items-center gap-2 mb-4">
              <Pencil size={20} /> Edit Crop
            </h2>

            {/* Input Fields */}
            <label className="block mb-3 text-gray-700">Crop:
              <input 
                type="text"
                value={selectedCrop.crop_name}
                onChange={(e) => setSelectedCrop({ ...selectedCrop, crop_name: e.target.value })}
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </label>

            <label className="block mb-3 text-gray-700">Amount (kg):
              <input 
                type="number"
                value={selectedCrop.quantity}
                onChange={(e) => setSelectedCrop({ ...selectedCrop, quantity: e.target.value })}
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </label>

            <label className="block mb-3 text-gray-700">Crop Quality:
              <select 
                value={selectedCrop.quality}
                onChange={(e) => setSelectedCrop({ ...selectedCrop, quality: e.target.value })}
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Grade A">Grade A</option>
                <option value="Tier B">Tier B</option>
                <option value="Tier C">Tier C</option>
              </select>
            </label>

            <label className=" mb-3 text-gray-700 flex items-center gap-2">
              <Calendar size={18} /> Harvest Date:
              <input 
                type="date"
                value={selectedCrop.date}
                onChange={(e) => setSelectedCrop({ ...selectedCrop, date: e.target.value })}
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </label>

            {/* Buttons */}
            <div className="flex justify-center mt-5 gap-3">
              <button 
                onClick={() => setEditCropModal(false)} 
                className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-gray-600 transition"
              >
                <X size={16} /> Cancel
              </button>
              <button 
                onClick={handleCropEdit} 
                className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-[#5A4ABB] transition"
              >
                <Check size={16} /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {editHarvestModal && (
              <div className="fixed z-[99] inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-2xl space-y-9 shadow-lg w-[420px]">
                  <h2 className="text-xl font-semibold text-primary flex justify-center text-center items-center gap-2 mb-4">
                    <Pencil size={20} /> Edit Crop
                  </h2>

                  {/* Input Fields */}
                  <label className="block mb-3 text-gray-700">Crop:
                    <input 
                      type="text"
                      value={selectedHarvest.crop_name}
                      onChange={(e) => setSelectedHarvest({ ...selectedHarvest, crop_name: e.target.value })}
                      className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </label>

                  <label className="block mb-3 text-gray-700">Amount (kg):
                    <input 
                      type="number"
                      value={selectedHarvest.quantity}
                      onChange={(e) => setSelectedHarvest({ ...selectedHarvest, quantity: e.target.value })}
                      className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </label>

                  <label className="block mb-3 text-gray-700">Crop Quality:
                    <select 
                      value={selectedHarvest.quality}
                      onChange={(e) => setSelectedHarvest({ ...selectedHarvest, quality: e.target.value })}
                      className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Grade A">Grade A</option>
                      <option value="Tier B">Tier B</option>
                      <option value="Tier C">Tier C</option>
                    </select>
                  </label>

                  <label className=" mb-3 text-gray-700 flex items-center gap-2">
                    <Calendar size={18} /> Harvest Date:
                    <input 
                      type="date"
                      value={selectedHarvest.date}
                      onChange={(e) => setSelectedHarvest({ ...selectedHarvest, date: e.target.value })}
                      className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </label>

                  {/* Buttons */}
                  <div className="flex justify-center mt-5 gap-3">
                    <button 
                      onClick={() => setEditHarvestModal(false)} 
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-gray-600 transition"
                    >
                      <X size={16} /> Cancel
                    </button>
                    <button 
                      onClick={handleHarvestEdit} 
                      className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-[#5A4ABB] transition"
                    >
                      <Check size={16} /> Save
                    </button>
                  </div>
                </div>
              </div>
            )}

      {deleteCropModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[350px] text-center">
            <h2 className="text-xl font-semibold text-black flex items-center justify-center gap-2 mb-4">
              <Trash2 size={20} /> Delete?
            </h2>

            <p className="text-gray-700">Are you sure? This action cannot be undone.</p>

            {/* Buttons */}
            <div className="flex justify-center mt-5 gap-4">
              <button 
                onClick={() => setDeletCropeModal(false)} 
                className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-gray-600 transition"
              >
                <X size={16} /> Cancel
              </button>
              <button 
                onClick={handleCropDelete} 
                className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-red-600 transition"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteHarvestModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[350px] text-center">
            <h2 className="text-xl font-semibold text-black flex items-center justify-center gap-2 mb-4">
              <Trash2 size={20} /> Delete?
            </h2>

            <p className="text-gray-700">Are you sure? This action cannot be undone.</p>

            {/* Buttons */}
            <div className="flex justify-center mt-5 gap-4">
              <button 
                onClick={() => setDeletCropeModal(false)} 
                className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-gray-600 transition"
              >
                <X size={16} /> Cancel
              </button>
              <button 
                onClick={handleHarvestDelete} 
                className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-red-600 transition"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}


    <div className="bg-[#fff] shadow-md rounded-2xl border border-gray-200 p-6 mb-6 mt-6">
    <div className="w-full p-5">
    {harvests?.length > 0 ? (
    <div className="w-full">
        <h1 className="text-center text-4xl  text-black pb-6">Your Inventory</h1>
      <table className="w-full table-fixed border-collapse">
        {/* Table Header */}
        <thead className="w-full">
          <tr className="bg-primary text-white w-full">
            <th className="text-left p-3 w-1/5">Crop</th>
            <th className="text-left p-3 w-1/5">Amount (kg)</th>
            <th className="text-left p-3 w-1/5">Organic Grade</th>
            <th className="text-left p-3 w-1/5">Harvest Date</th>
            <th className="text-left p-3 w-1/5">Status</th>
            <th className="text-left p-3 w-1/5">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {harvests.map((harvest) => {
            return (
              <tr key={harvest.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                <td className="p-3">{harvest.crop_name}</td>
                <td className="p-3">{harvest.quantity}</td>
                <td className="p-3">{harvest.quality}</td>
                <td className="p-3">{harvest.harvest_date}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-md text-white ${
                      harvest.status === "Harvested" ? "bg-green-500" : harvest.status === "Pending" ? "bg-yellow-500" : "bg-gray-400"
                    }`}
                  >
                    {harvest.status}
                  </span>
                </td>
                <td className="p-3 flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedHarvest(harvest);
                      setEditHarvestModal(true);
                    }}
                    className="bg-primary text-white px-3 py-2 rounded-md shadow-md flex items-center gap-2 hover:bg-[#5A4ABB] transition"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedHarvest(harvest);
                      setDeleteHarvestModal(true);
                    }}
                    className="bg-red-500 text-white px-3 py-2 rounded-md shadow-md flex items-center gap-2 hover:bg-red-600 transition"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )  : (
          <div className="relative w-full">
            {/* Overlay Text */}
            <p className="text-gray-600 text-lg font-semibold absolute inset-0 flex items-center justify-center z-10">
              No harvested crops to display yet.
            </p>

            {/* Blurry Dummy Table */}
            <div className="opacity-40 blur-sm pointer-events-none">
              <table className="w-full table-fixed border-collapse mt-2">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left p-3 w-1/5">Crop</th>
                    <th className="text-left p-3 w-1/5">Amount (kg)</th>
                    <th className="text-left p-3 w-1/5">Organic Grade</th>
                    <th className="text-left p-3 w-1/5">Harvest Date</th>
                    <th className="text-left p-3 w-1/5">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-b border-gray-300 bg-gray-100">
                      <td className="p-3 bg-gray-200">&nbsp;</td>
                      <td className="p-3 bg-gray-200">&nbsp;</td>
                      <td className="p-3 bg-gray-200">&nbsp;</td>
                      <td className="p-3 bg-gray-200">&nbsp;</td>
                      <td className="p-3 bg-gray-200">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default FarmerCrops;

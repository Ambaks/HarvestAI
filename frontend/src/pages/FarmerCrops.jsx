import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFetchUser } from "../api/authService";
import { X, Pencil, Calendar, Leaf, CheckCircle, PlusCircle, Check, Trash2 } from "lucide-react";
import { useData } from "../context/DataContext";
import { theme } from "../constants";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

const FarmerCrops = () => {
  const { user } = useFetchUser();
  const {crops, setCrops, fetchCrops} = useData();


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Weight, setWeight] = useState("");
  const [harvestDate, setHarvestDate] = useState(new Date().toISOString().split("T")[0]);
  const [cropQuality, setCropQuality] = useState("Grade A");
  const [cropName, setCropName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);


  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);


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
      setWeight("");
    } catch (err) {
      console.error("Error submitting harvest:", err);
      setError("Failed to submit harvest. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleEdit = async () => {
    try {
      const updatedData = {
        crop_name: selectedCrop.crop_name,
        quantity: parseFloat(selectedCrop.quantity), // Convert to float
        quality: selectedCrop.quality,
        date: selectedCrop.date,
        
      };
  
      // The id is only used in the URL, not in the request body
      console.log("Payload being sent:", updatedData);
      await axios.put(`${API_BASE_URL}/harvests/crops/${selectedCrop.id}`, updatedData);
  
      setCrops(crops.map(crop => (crop.id === selectedCrop.id ? { ...crop, ...updatedData } : crop)));
      setEditModal(false);
    } catch (error) {
      console.error("Error updating crop:", error);
    }
  };


  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/harvests/crops/${selectedCrop.id}`);
      setCrops(crops.filter(crop => crop.id !== selectedCrop.id));
      setDeleteModal(false);
    } catch (error) {
      console.error("Error deleting crop:", error);
    }
  };


  return (
    <div>
      
      <div className="bg-[#F8F7FC] shadow-md rounded-2xl p-6 mb-6">
        <h1 className="text-2xl font-semibold text-black mb-4">Your Crops</h1>
        <div className="flex justify-start">
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
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
          <table className="w-full border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3 rounded-tl-lg">Amount (kg)</th>
                <th className="text-left p-3">Quality</th>
                <th className="text-left p-3">Harvest Date</th>
                <th className="text-left p-3">Crop</th>
                <th className="text-right p-3 rounded-tr-lg">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {crops.map((crop, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition">
                  <td className="p-3">{crop.quantity}</td>
                  <td className="p-3">{crop.quality}</td>
                  <td className="p-3">{crop.date}</td>
                  <td className="p-3">{crop.crop_name}</td>
                  <td className="p-3 flex gap-3 justify-end">
                    {/* Edit Button */}
                    <button
                      onClick={() => { setSelectedCrop(crop); setEditModal(true); }}
                      className="bg-primary text-white px-3 py-2 rounded-md shadow-md flex items-center gap-2 hover:bg-[#5A4ABB] transition"
                    >
                      <Pencil size={16} /> Edit
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => { setSelectedCrop(crop); setDeleteModal(true); }}
                      className="bg-red-500 text-white px-3 py-2 rounded-md shadow-md flex items-center gap-2 hover:bg-red-600 transition"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-gray-500 text-center py-6">
            <p>No crops recorded yet.</p>
          </div>
        )}
      </div>
      
      {editModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
                onClick={() => setEditModal(false)} 
                className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-gray-600 transition"
              >
                <X size={16} /> Cancel
              </button>
              <button 
                onClick={handleEdit} 
                className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-[#5A4ABB] transition"
              >
                <Check size={16} /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[350px] text-center">
            <h2 className="text-xl font-semibold text-black flex items-center justify-center gap-2 mb-4">
              <Trash2 size={20} /> Delete Crop?
            </h2>

            <p className="text-gray-700">Are you sure you want to delete this crop? This action cannot be undone.</p>

            {/* Buttons */}
            <div className="flex justify-center mt-5 gap-4">
              <button 
                onClick={() => setDeleteModal(false)} 
                className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-gray-600 transition"
              >
                <X size={16} /> Cancel
              </button>
              <button 
                onClick={handleDelete} 
                className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-red-600 transition"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
    
  );
};

export default FarmerCrops;

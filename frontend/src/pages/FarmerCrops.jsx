import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFetchUser } from "../api/authService";
import { useData } from "../context/DataContext";


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
      <h1 className="text-black text-xl mb-4 mt-6">Your Crops:</h1>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Add Crop
        </button>
      </div>

      {/* Modal for Adding a Crop */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[460px] h-auto">
            <h2 className="text-lg font-bold mb-4">🌱 Record New Harvest</h2>
            <div className="space-y-6">
              <label className="block mt-2">
                ✏️ Manual Entry:
                <input
                  type="number"
                  value={Weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="border p-2 w-full rounded"
                  placeholder="Enter weight in kg"
                  required
                />
              </label>
              <label className="block mt-2">
                ✏️ Crop:
                <input
                  type="text"
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  className="border p-2 w-full rounded"
                  placeholder="What are you selling?"
                  required
                />
              </label>
              <label className="block mt-2">
                📅 Harvest Date:
                <input
                  type="date"
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="border p-2 w-full rounded"
                  required
                />
              </label>
              <label className="block mt-2">
                🌾 Crop Quality:
                <select
                  value={cropQuality}
                  onChange={(e) => setCropQuality(e.target.value)}
                  className="border p-2 w-full rounded"
                  required
                >
                  <option value="Grade A">Grade A</option>
                  <option value="Tier B">Tier B</option>
                  <option value="Tier C">Tier C</option>
                </select>
              </label>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex justify-end mt-4">
                <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded shadow mr-2">
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className={`bg-green-500 text-white px-4 py-2 rounded shadow ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "✅ Submit Harvest"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Crops List */}
      <div className="w-full p-5 border rounded-md border-gray-300 bg-gray-100">
        {crops?.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left p-2">Amount (kg)</th>
                <th className="text-left p-2">Quality</th>
                <th className="text-left p-2">Harvest Date</th>
                <th className="text-left p-2">Crop</th>
              </tr>
            </thead>
            <tbody>
              {crops.map((crop, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-2">{crop.quantity}</td>
                  <td className="p-2">{crop.quality}</td>
                  <td className="p-2">{crop.date}</td>
                  <td className="p-2">{crop.crop_name}</td>
                  <td className="p-2 flex gap-2 justify-end">
                    <button onClick={() => { setSelectedCrop(crop); setEditModal(true); }} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">Edit</button>
                    <button onClick={() => { setSelectedCrop(crop); setDeleteModal(true); }} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No crops available.</p>
        )}
      </div>
      {editModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-lg font-bold mb-4">Edit Crop</h2>
            <label className="block mt-2">Crop:
              <input type="text" value={selectedCrop.crop_name} onChange={(e) => setSelectedCrop({ ...selectedCrop, crop_name: e.target.value })} className="border p-2 w-full rounded" />
            </label>
            <label className="block mt-2">Amount (kg):
              <input type="number" value={selectedCrop.quantity} onChange={(e) => setSelectedCrop({ ...selectedCrop, quantity: e.target.value })} className="border p-2 w-full rounded" />
            </label>
            <label className="block mt-2">Crop Quality:
              <select value={selectedCrop.quality} onChange={(e) => setSelectedCrop({ ...selectedCrop, quality: e.target.value })} className="border p-2 w-full rounded">
                <option value="Grade A">Grade A</option>
                <option value="Tier B">Tier B</option>
                <option value="Tier C">Tier C</option>
              </select>
            </label>
            <label className="block mt-2">Harvest Date:
              <input type="date" value={selectedCrop.date} onChange={(e) => setSelectedCrop({ ...selectedCrop, date: e.target.value })} className="border p-2 w-full rounded" />
            </label>
            <div className="flex justify-end mt-4">
              <button onClick={() => setEditModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
              <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Are you sure you want to delete this crop?</h2>
            <div className="flex justify-end mt-4">
              <button onClick={() => setDeleteModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerCrops;

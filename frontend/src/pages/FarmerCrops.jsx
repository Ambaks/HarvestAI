import React, { useState } from "react";
import axios from "axios";
import { useFetchUser } from "../api/authService";

const FarmerCrops = () => {
  const { user } = useFetchUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [manualWeight, setManualWeight] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [harvestDate, setHarvestDate] = useState(new Date().toISOString().split("T")[0]);
  const [cropQuality, setCropQuality] = useState("Grade A");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!manualWeight) {
      setError("Please enter a valid weight.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("user_id", user?.id); // Ensure the user ID is included
    formData.append("manual_weight", manualWeight);
    formData.append("harvest_date", harvestDate);
    formData.append("crop_quality", cropQuality);
    if (selectedFile) {
      formData.append("crop_image", selectedFile);
    }

    try {
      const response = await axios.post(
        "https://your-backend-api.com/api/crops/", // Replace with your actual backend API
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // Ensure HTTP-only cookies are sent
        }
      );

      console.log("Harvest submitted successfully:", response.data);
      setIsModalOpen(false);
      setManualWeight("");
      setSelectedFile(null);
    } catch (err) {
      console.error("Error submitting harvest:", err);
      setError("Failed to submit harvest. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-black">Your Crops:</h1>
      <div className="flex gap-4 mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Edit All</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Delete All</button>
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
                  value={manualWeight}
                  onChange={(e) => setManualWeight(e.target.value)}
                  className="border p-2 w-full rounded"
                  placeholder="Enter weight in kg"
                  required
                />
              </label>
              <label className="block mt-2">
                📸 Upload Crop Photo:
                <input type="file" onChange={handleFileChange} className="border p-2 w-full rounded" />
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
                <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className={`bg-green-500 text-white px-4 py-2 rounded ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
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
        {user?.crops?.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left p-2">Amount</th>
                <th className="text-left p-2">Quality</th>
                <th className="text-left p-2">Harvest Date</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {user.crops.map((crop, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-2">{crop.amount}</td>
                  <td className="p-2">{crop.quality}</td>
                  <td className="p-2">{crop.harvest_date}</td>
                  <td className="p-2 flex gap-2 justify-end">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">Edit</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No crops available.</p>
        )}
      </div>
    </div>
  );
};

export default FarmerCrops;

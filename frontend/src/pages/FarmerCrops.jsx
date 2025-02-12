import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFetchUser } from "../api/authService";

const FarmerCrops = () => {
  const { user } = useFetchUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Weight, setWeight] = useState("");
  const [harvestDate, setHarvestDate] = useState(new Date().toISOString().split("T")[0]);
  const [cropQuality, setCropQuality] = useState("Grade A");
  const [cropName, setCropName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [crops, setCrops] = useState([]);


  useEffect(() => {
    const fetchCrops = async () => {
        try {
            const response = await axios.get("http://localhost:8000/harvests/crops/", {
                params: { farmer_id: user?.id }, // Ensure user.id is available
            });
            console.log("API Response Data:", response.data);
            setCrops(response.data);
        } catch (error) {
            console.error("Error fetching crops:", error);
        }
    };

    if (user?.id) {
        fetchCrops();
    }
}, [user?.id]);


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
      const response = await axios.post(
        "http://localhost:8000/harvests/crops/new", // Replace with your actual backend API
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Ensure HTTP-only cookies are sent
        }
      );

      console.log("Harvest submitted successfully:", response.data);
      setIsModalOpen(false);
      setWeight("");
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
        {crops?.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left p-2">Amount</th>
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

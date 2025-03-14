import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useFetchUser } from "../api/authService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const FarmerSettings = () => {
    const { user_id } = useParams();
    const { user, setUser } = useFetchUser();
    const [editingField, setEditingField] = useState(null);
    const [tempValue, setTempValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const openModal = (field) => {
        setEditingField(field);
        setTempValue(user[field] || ""); // Load current value
        setError("");
    };
    
    const handleSave = async () => {
        console.log("User data:", user)
        if (tempValue.trim() === "") {
            setEditingField(null); // Close modal without changes
            return;
        }
    
        setLoading(true);
        try {
            const updatedField = { [editingField]: tempValue }; // Send only updated field
    
            const response = await fetch(`${API_BASE_URL}/users/${user_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // ✅ Sends HTTP-only cookies
                body: JSON.stringify(updatedField),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Update error:", errorData);
                throw new Error(errorData.detail || "Failed to update information.");
            }
            
            const updatedUser = await response.json();
            setUser((prevUser) => ({
                ...prevUser,   // ✅ Keep old data
                [editingField]: tempValue, // ✅ Update only the modified field
            }));
            setEditingField(null);
        } catch (err) {
            setError(err.message);
            console.error("Update error:", err);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="p-6 font-inter">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
            <div className="w-full p-6 border rounded-xl border-gray-300 bg-gray-50 shadow-sm">
                {[ 
                    { label: "First Name", key: "first_name" },
                    { label: "Last Name", key: "last_name" },
                    { label: "Date of Birth", key: "dob" },
                    { label: "Gender", key: "gender" },
                    { label: "Farm Location", key: "location" },
                    { label: "Farm size", key: "farm_size" },
                    { label: "E-mail", key: "email" },
                    { label: "Phone Number", key: "phone" }
                ].map(({ label, key }) => (
                    <div key={key} className="flex justify-between items-center p-4 border-b last:border-b-0">
                        <div>
                            <h3 className="text-gray-700 font-medium">{label}:</h3>
                            <p className="text-gray-500">{user[key] || "Not set"}</p>
                        </div>
                        <button
                            onClick={() => openModal(key)}
                            className="ml-3 bg-[#6C4FF6] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#5a3cd3] transition-all"
                        >
                            Edit
                        </button>
                    </div>
                ))}
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mt-8 mb-4">M-Pesa</h1>
            <div className="w-full p-6 border rounded-xl border-gray-300 bg-gray-50 shadow-sm"></div>
            {editingField && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4 text-gray-800">Edit {editingField.replace("_", " ")}</h2>
                        <input
                            type="text"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                        />
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setEditingField(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 shadow-md hover:bg-gray-600 transition-all"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#5a3cd3] transition-all"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FarmerSettings;
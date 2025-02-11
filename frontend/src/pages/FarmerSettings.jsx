import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

const FarmerSettings = () => {
    const { user, setUser } = useContext(UserContext);
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
        if (tempValue.trim() === "") {
            setEditingField(null); // Close modal without changes
            return;
        }
    
        setLoading(true);
        try {
            const updatedField = { [editingField]: tempValue }; // Send only updated field
    
            const response = await fetch(`${API_BASE_URL}/users/${user.email}`, {
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
            setUser(updatedUser); // ✅ Update React context with new user data
            setEditingField(null);
        } catch (err) {
            setError(err.message);
            console.error("Update error:", err);
        } finally {
            setLoading(false);
        }
    };
    
    
    

    return (
        <div className="p-6">
            <h1 className="text-xl font-black mb-4">Settings</h1>
            <div className="w-full p-5 border rounded-md border-gray-300 bg-gray-100">
                {[
                    { label: "First Name", key: "first_name" },
                    { label: "Last Name", key: "last_name" },
                    { label: "Date of Birth", key: "dob" },
                    { label: "E-mail", key: "email" },
                    { label: "Phone Number", key: "phone" },
                    { label: "Password", key: "password" }
                ].map(({ label, key }) => (
                    <div key={key} className="flex justify-between items-center p-3 border-b">
                        <div>
                            <h3 className="font-semibold">{label}:</h3>
                            <p>{user[key] || "Not set"}</p>
                        </div>
                        <button
                            onClick={() => openModal(key)}
                            className="ml-3 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Edit
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {editingField && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Edit {editingField.replace("_", " ")}</h2>
                        <input
                            type="text"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                        />
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                        <div className="flex justify-end">
                            <button
                                onClick={() => setEditingField(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-green-500 text-white px-4 py-2 rounded"
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

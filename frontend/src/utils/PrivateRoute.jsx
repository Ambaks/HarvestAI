import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${API_BASE_URL}/auth/validate`, {
          withCredentials: true, // Ensures cookies are sent in the request
        });
        setIsAuthenticated(true); // If the request succeeds, the user is authenticated
      } catch (error) {
        console.error("Authentication check failed:", error.message || error);
        setIsAuthenticated(false); // If the request fails, the user is not authenticated
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/Spinner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds user information
  const [loading, setLoading] = useState(true); // Tracks session validation status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Initialize navigation for redirection

  useEffect(() => {
    const validateUser = async () => {
      try {
        // Validate session using the HttpOnly cookie
        const response = await axios.get(`${API_BASE_URL}/auth/validate`, {
          withCredentials: true, // Ensure cookies are sent
      });
        setIsAuthenticated(true);
        setUser(response.data); // Set user info in the context
      } catch (error) {
        console.error("Session validation failed:", error.response?.data);
        setUser(null); // Clear user info on validation failure
        setIsAuthenticated(false);
       
      } finally {
        setLoading(false); // Stop loading state after validation
      }
    };

    validateUser();
  },  [navigate]); // Only runs on initial render


  const logout = async () => {
    try {
      // Call the backend to log out and clear the HttpOnly cookie
      await axios.post("http://localhost:8000/auth/logout", {}, { withCredentials: true });
      setUser(null); // Clear user context on logout
    } catch (error) {
      console.error("Logout failed:", error.response?.data);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner flex justify-center items-center min-h-screen w-full">
        <LoadingSpinner>
          <span className="visually-hidden">Loading...</span>
        </LoadingSpinner>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, logout }}>
      {children}
    </UserContext.Provider>
  );
};

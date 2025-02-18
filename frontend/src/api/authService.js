import axios from "axios";
import { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";



const API_URL = 'http://localhost:8000';

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      { email, password },
      { withCredentials: true } // Ensures cookies are handled automatically
    );
    return response.data; // Expect { user_info } and cookies set by the server
  } catch (error) {
    throw error.response?.data?.message || "Login failed. Please try again.";
  }
};

export const register = async (firstName, lastName, email, password, role) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/register`,
      { first_name: firstName, last_name: lastName, email, password, role }
    );
    return response.data; // Expect { message: "User registered successfully" }
  } catch (error) {
    throw error.response?.data?.message || "Registration failed. Please try again.";
  }
};




/*Logout function */
export const logout = async (setUser, resetData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
    window.location.href = "/";
    setUser(null); // Reset user state to prevent data leakage
    resetData();
    return response.data; // Ensure the function returns a result


  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed. Please try again.");
  }
};


/* Function to get user data from context */
export const useFetchUser = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
      const fetchUserData = async () => {
          console.log("Validating session...");
          try {
              if (!user) {
                  const response = await axios.get("http://localhost:8000/auth/validate", { withCredentials: true });
                  console.log("Validation response:", response.data);
                  setUser(response.data);
              }
          } catch (error) {
              console.error("Error fetching user data:", error.response?.data);
              setUser(null);
          }
      };

      fetchUserData();
  }, [setUser]);

  return { user, setUser }; // Return user state so it can be accessed in components
};
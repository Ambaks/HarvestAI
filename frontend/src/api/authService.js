import axios from "axios";

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

export const register = async (firstName, lastName, email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/register`,
      { first_name: firstName, last_name: lastName, email, password }
    );
    return response.data; // Expect { message: "User registered successfully" }
  } catch (error) {
    throw error.response?.data?.message || "Registration failed. Please try again.";
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
  } catch (error) {
    throw error.response?.data?.message || "Logout failed. Please try again.";
  }
};

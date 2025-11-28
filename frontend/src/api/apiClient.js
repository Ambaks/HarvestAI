import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  timeout: 30000, // 30 seconds
  withCredentials: true, // Enable sending cookies with requests
});

export default apiClient;

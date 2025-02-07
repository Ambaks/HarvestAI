import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000", // Replace with your FastAPI backend URL
  timeout: 9999999999,
});

// Add an interceptor to include the JWT in the headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt"); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;

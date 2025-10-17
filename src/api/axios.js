// axios: tiny HTTP client we use to call the backend APIs
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // backend base URL (adjust for prod)
});

api.interceptors.request.use((config) => {
  // read JWT from localStorage and attach to every request
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

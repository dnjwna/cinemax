import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://38.47.180.195/student06/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("cinemax_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
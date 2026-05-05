import axios from "axios";
import { API_URL } from "../config";

/**
 * Shared axios instance. All API calls should use this so that the base URL
 * and auth header live in one place.
 */
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://recroot-backend.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // Increased to 60s since Render free tier can take up to 50s to wake up from sleep
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle global errors, e.g., 401 Unauthorized to trigger logout
    if (error.response && error.response.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;

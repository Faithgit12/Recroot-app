import axios from 'axios';

// Replace with your actual backend URL or use an environment variable
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  async (config) => {
    // You can add logic here to fetch tokens from secure storage
    // const token = await SecureStore.getItemAsync('userToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle global errors, e.g., 401 Unauthorized to trigger logout
    return Promise.reject(error);
  }
);

export default api;

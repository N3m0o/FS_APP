import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000', // adjust if backend URL is different
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to inject the API key
api.interceptors.request.use(
  (config) => {
    // In a real app, you might store this in env or use a more secure method
    // For this test, we hardcode as per backend guard or use env
    const apiKey = process.env.NEXT_PUBLIC_API_KEY || 'nest-ems-key-2026';
    config.headers['x-api-key'] = apiKey;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for global error handling (optional, but good practice)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Create a user-friendly error message
    const message = error.response?.data?.message || 'An unexpected error occurred';
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

export default api;

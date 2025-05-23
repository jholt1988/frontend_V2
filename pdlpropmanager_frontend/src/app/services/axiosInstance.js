// src/services/axiosInstance.js

import axios from 'axios';


// Create base axios instance
const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',

  },
  
});

// Automatically attach token (if exists)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: Global error handler (e.g., auto logout on 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('⛔ Unauthorized - logging out');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

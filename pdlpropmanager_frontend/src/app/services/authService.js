// src/services/authService.js
import api from './axiosInstance';

export const loginUser = async (userData) => {
  const res = await api.post('/auth/login', userData);
  return res.data;
};

export const registerUser = async (userData) => {
  const res = await api.post('/auth/register', userData);
  return res.data;
};

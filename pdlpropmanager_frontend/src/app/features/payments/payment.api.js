// src/features/payments/payment.api.js
import api from '@/services/axiosInstance';

export const getPayments =async () => await api.get('/payments');
export const createPayment = async (data) => await api.post('/payments', data);
export const updatePayment = async (id, data) => await api.put(`/payments/${id}`, data);
export const deletePayment = async (id) => await api.delete(`/payments/${id}`);


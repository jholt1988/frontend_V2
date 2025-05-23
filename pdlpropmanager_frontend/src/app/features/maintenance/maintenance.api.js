// src/features/maintenance/maintenance.api.js
import api from '../../utils/axios';

export const getRequests = () => api.get('/maintenance');
export const createRequest = (data) => api.post('/maintenance', data);
export const updateRequest = (id, data) => api.put(`/maintenance/${id}`, data);
export const deleteRequest = (id) => api.delete(`/maintenance/${id}`);

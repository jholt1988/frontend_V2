// src/features/leases/lease.api.js
import api from '../../utils/axios';

export const getLeases = () => api.get('/leases');
export const createLease = (data) => api.post('/leases', data);
export const updateLease = (id, data) => api.put(`/leases/${id}`, data);
export const deleteLease = (id) => api.delete(`/leases/${id}`);

// src/features/tenants/tenant.api.js
import api from '../../utils/axios';

export const getTenants = () => api.get('/tenants');
export const createTenant = (data) => api.post('/tenants', data);
export const updateTenant = (id, data) => api.put(`/tenants/${id}`, data);
export const deleteTenant = (id) => api.delete(`/tenants/${id}`);

// src/features/properties/property.api.js
import api from '../../utils/axios';

export const getProperties = () => api.get('/properties');
export const createProperty = (data) => api.post('/properties', data);
export const updateProperty = (id, data) => api.put(`/properties/${id}`, data);
export const deleteProperty = (id) => api.delete(`/properties/${id}`);

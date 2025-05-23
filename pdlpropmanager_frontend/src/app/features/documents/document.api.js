// src/features/documents/document.api.js
import api from '../../utils/axios';

export const getDocuments = () => api.get('/documents');
export const uploadDocument = (formData) =>
    api.post('/documents', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
export const deleteDocument = (id) => api.delete(`/documents/${id}`);

// src/features/notifications/notification.api.js
import api from '../../utils/axios';

export const getNotifications = () => api.get('/notifications');
export const createNotification = (data) => api.post('/notifications', data);
export const updateNotification = (id, data) => api.put(`/notifications/${id}`, data);
export const deleteNotification = (id) => api.delete(`/notifications/${id}`);

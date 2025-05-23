// src/services/apiService.js
import api from './axiosInstance';

export const getPayments = async () => {
  const res = await api.get('/payments/mine');
  return res.data;
};

export const createMaintenanceRequest = async (data) => {
  const res = await api.post('/maintenance', data);
  return res.data;
};

export const getMaintenanceRequests = async () => {
  const res = await api.get('/maintenance');
  return res.data;
};

export const updateMaintenanceStatus = async (id, status) => {
  const res = await api.put(`/maintenance/${id}`, { status });
  return res.data;
}
export const getTenantProfile = async (userId) => {
  const res = await api.get(`/tenant-profile/${userId}`);
  return res.data;
};

export const createTenantProfile = async (profile) => {
  const res = await api.post('/tenant-profile', profile);
  return res.data;
};

export const updateTenantProfile = async (userId, profile) => {
  const res = await api.put(`/tenant-profile/${userId}`, profile);
  return res.data;
};

export const createPayment = async (data) => {
    const res = await api.post('/payments', data);
    return res.data;
  };
  
  export const getAllPayments = async () => {
    const res = await api.get('/payments');
    return res.data;
  };
  export const searchUsers = async (query) => {
    const res = await api.get(`/users?search=${encodeURIComponent(query)}`);
    return res.data; // assumes it returns [{ id, name, email }]
  };

  export const getMyPayments = async () => {
    const res = await api.get('/payments/mine');
    return res.data;
  };
  
  export const getDashboardSummary = async () => {
    const res = await api.get('/dashboard/summary');
    return res.data;
  };

  export const getDashboardStats = async () => {
    const res = await api.get('/dashboard/stats');
    return res.data;
  };
  
  export const getTenantPayments = async (id) => {
  const res = await api.get(`/tenants/${id}/payments`);
  return res.data;
};

export const getTenantMaintenance = async (id) => {
  const res = await api.get(`/tenants/${id}/maintenance`);
  return res.data;
};

export const getTenants = async (search = '') => {
    const res = await api.get(`/users?role=tenant&search=${encodeURIComponent(search)}`);
    return res.data;
  };
  
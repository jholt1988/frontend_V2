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

  export const createTenant = async (data) => {
    const res = await api.post('/tenants', data);
    return res.data;
  };

  export const getTenant = async (id) => {
    const res = await api.get(`/tenants/${id}`);
    return res.data;
  };

  export const updateTenant = async (id, data) => {
    const res = await api.put(`/tenants/${id}`, data);
    return res.data;
  };

  export const deleteTenant = async (id) => {
    const res = await api.delete(`/tenants/${id}`);
    return res.data;
  };
  
  export const getNotifications = async (id) => {
    const res = await api.get(`/notifications/${id}`);
    return res.data;
  };
  export const createNotification = async (data) => {
    const res = await api.post('/notifications', data);
    return res.data;
  };
  export const updateNotification = async (id, data) => {
    const res = await api.put(`/notifications/${id}`, data);
    return res.data;
  };
  export const deleteNotification = async (id) => {
    const res = await api.delete(`/notifications/${id}`);
    return res.data;
  };

export const getTenantLedger = async (tenantId) => {
  const res = await api.get(`/ledgers/${tenantId}`);
  return res.data;
};

export const createLedgerEntry = async (tenantId, data) => {
  const res = await api.post(`/ledgers/${tenantId}`, data);
  return res.data;
};

export const updateLedgerEntry = async (entryId, data) => {
  const res = await api.put(`/ledgers/entry/${entryId}`, data);
  return res.data;
};

export const deleteLedgerEntry = async (entryId) => {
  const res = await api.delete(`/ledgers/entry/${entryId}`);
  return res.data;
};

export const sendLedgerStatement = async (tenantId) => {
  const res = await api.post(`/ledgers/${tenantId}/send-statement`);
  return res.data;
};

export const getRecentLedgerEntries = async () => {
  const res = await api.get('/admin/recent/ledger');
  return res.data;
};

// Documents
export const uploadDocument = async (formData) => (await api.post('/documents/upload', formData)).data;
export const getTenantDocuments = async (tenantId) => (await api.get(`/documents/${tenantId}`)).data;
export const deleteDocument = async (docId) => (await api.delete(`/documents/${docId}`)).data;

// Notifications
export const markNotificationRead = async (id) => (await api.put(`/notifications/${id}/read`)).data;
export const sendNotification = async (data) => (await api.post('/notifications', data)).data;

  
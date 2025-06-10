// src/features/tenants/useTenants.js
import { useState, useEffect } from 'react';
import {
    getTenants,
    createTenant as apiCreate,
    updateTenant as apiUpdate,
    deleteTenant as apiDelete
} from '@/services/apiService';
import { useToast } from '@/lib/useToast';

const useTenants = () => {
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);
    const { success, error } = useToast();
    const refreshTenants = async () => {
        try {
            const { data } = await getTenants();
            setTenants(data);
        } catch {
            error('Failed to load tenants');
        } finally {
            setLoading(false);
        }
    };

    const createTenant = async (data) => {
        await apiCreate(data);
        success('Tenant created');
        await refreshTenants(); // Refresh after creation
     
    };

    const updateTenant = async (id, data) => {
        await apiUpdate(id, data);
        success('Tenant updated');
        await refreshTenants(); // Refresh after update
        
    };

    const deleteTenant = async (id) => {
        await apiDelete(id);
        success('Tenant deleted');
        await refreshTenants(); // Refresh after deletion
    };

    useEffect(() => {
        refreshTenants();
    }, []);

    return {
        tenants,
        loading,
        createTenant,
        updateTenant,
        deleteTenant,
        refreshTenants
    };
};

export default useTenants;

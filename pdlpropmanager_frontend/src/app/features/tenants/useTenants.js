// src/features/tenants/useTenants.js
import { useState, useEffect } from 'react';
import {
    getTenants,
    createTenant as apiCreate,
    updateTenant as apiUpdate,
    deleteTenant as apiDelete
} from './tenant.api';
import { toast } from 'react-toastify';

const useTenants = () => {
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);

    const refreshTenants = async () => {
        try {
            const { data } = await getTenants();
            setTenants(data);
        } catch {
            toast.error('Failed to load tenants');
        } finally {
            setLoading(false);
        }
    };

    const createTenant = async (data) => {
        await apiCreate(data);
        toast.success('Tenant created');
        refreshTenants();
    };

    const updateTenant = async (id, data) => {
        await apiUpdate(id, data);
        toast.success('Tenant updated');
        refreshTenants();
    };

    const deleteTenant = async (id) => {
        await apiDelete(id);
        toast.success('Tenant deleted');
        refreshTenants();
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

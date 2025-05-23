// src/features/maintenance/useMaintenance.js
import { useState, useEffect } from 'react';
import {
    getRequests,
    createRequest as apiCreate,
    updateRequest as apiUpdate,
    deleteRequest as apiDelete
} from './maintenance.api';
import { toast } from 'react-toastify';

const useMaintenance = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const refreshRequests = async () => {
        try {
            const { data } = await getRequests();
            setRequests(data);
        } catch {
            toast.error('Failed to load maintenance requests');
        } finally {
            setLoading(false);
        }
    };

    const createRequest = async (data) => {
        await apiCreate(data);
        toast.success('Request created');
        refreshRequests();
    };

    const updateRequest = async (id, data) => {
        await apiUpdate(id, data);
        toast.success('Request updated');
        refreshRequests();
    };

    const deleteRequest = async (id) => {
        await apiDelete(id);
        toast.success('Request deleted');
        refreshRequests();
    };

    useEffect(() => {
        refreshRequests();
    }, []);

    return {
        requests,
        loading,
        createRequest,
        updateRequest,
        deleteRequest,
        refreshRequests
    };
};

export default useMaintenance;

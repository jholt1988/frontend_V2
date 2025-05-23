// src/features/properties/useProperties.js
import { useState, useEffect } from 'react';
import {
    getProperties,
    createProperty as apiCreate,
    updateProperty as apiUpdate,
    deleteProperty as apiDelete
} from './property.api';
import { toast } from 'react-toastify';

const useProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const refreshProperties = async () => {
        try {
            const { data } = await getProperties();
            setProperties(data);
        } catch {
            toast.error('Failed to load properties');
        } finally {
            setLoading(false);
        }
    };

    const createProperty = async (data) => {
        await apiCreate(data);
        toast.success('Property created');
        refreshProperties();
    };

    const updateProperty = async (id, data) => {
        await apiUpdate(id, data);
        toast.success('Property updated');
        refreshProperties();
    };

    const deleteProperty = async (id) => {
        await apiDelete(id);
        toast.success('Property deleted');
        refreshProperties();
    };

    useEffect(() => {
        refreshProperties();
    }, []);

    return {
        properties,
        loading,
        createProperty,
        updateProperty,
        deleteProperty,
        refreshProperties
    };
};

export default useProperties;

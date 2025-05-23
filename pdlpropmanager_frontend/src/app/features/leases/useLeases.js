
// src/features/leases/useLeases.js
import { useState, useEffect } from 'react';
import {
    getLeases,
    createLease as apiCreate,
    updateLease as apiUpdate,
    deleteLease as apiDelete
} from './lease.api';
import { toast } from 'react-toastify';

const useLeases = () => {
    const [leases, setLeases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [leaseManagerRecords, setLeaseManagerRecords] = useState(null);

    const refreshLeases = async () => {
        try {
            const { data } = await getLeases();
            setLeases(data);
        } catch {
            toast.error('Failed to load leases');
        } finally {
            setLoading(false);
        }
    };

    const createLease = async (data) => {
        await apiCreate(data);
        toast.success('Lease created');
        refreshLeases();
    };

    const updateLease = async (id, data) => {
        await apiUpdate(id, data);
        toast.success('Lease updated');
        refreshLeases();
    };

    const deleteLease = async (id) => {
        await apiDelete(id);
        toast.success('Lease deleted');
        refreshLeases();
    };

    const leaseManagerRecord = () => {
        if (!leaseManagerRecords) {
            setLeaseManagerRecords(leases.map(lease => {
                return {
                    id: lease.id,
                    tenantName: lease.tenant.name,
                    propertyName: lease.property.address.split(" ")[1],
                    startDate: lease.startDate,
                    endDate: lease.endDate,
                    status: lease.status,
                    monthlyRent: lease.rentAmount
                  
             }
            }));
        }
        return leaseManagerRecords;
    }


    useEffect(() => {
        refreshLeases();
    }, []);

    return {
        leaseManagerRecords,
        leases,
        loading,
        createLease,
        updateLease,
        deleteLease,
        refreshLeases
    };
};

export default useLeases;

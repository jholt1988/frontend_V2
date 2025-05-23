// src/features/payments/usePayments.js
import { useState, useEffect } from 'react';
import {
    getPayments,
    createPayment as apiCreate,
    updatePayment as apiUpdate,
    deletePayment as apiDelete
} from './payment.api';
import { toast } from 'react-toastify';

const usePayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const refreshPayments = async () => {
        try {
            const { data } = await getPayments();
            setPayments(data);
        } catch {
            toast.error('Failed to load payments');
        } finally {
            setLoading(false);
        }
    };

    const createPayment = async (data) => {
        await apiCreate(data);
        toast.success('Payment created');
        refreshPayments();
    };

    const updatePayment = async (id, data) => {
        await apiUpdate(id, data);
        toast.success('Payment updated');
        refreshPayments();
    };

    const deletePayment = async (id) => {
        await apiDelete(id);
        toast.success('Payment deleted');
        refreshPayments();
    };

    useEffect(() => {
        refreshPayments();
    }, []);

    return {
        payments,
        loading,
        createPayment,
        updatePayment,
        deletePayment,
        refreshPayments
    };
};

export default usePayments;

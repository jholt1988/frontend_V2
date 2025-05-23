import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import api from '../../utils/axios'; // adjust path if needed
import { motion } from 'framer-motion';

const statusColors = {
    completed: 'success',
    pending: 'warning',
    failed: 'error',
};

const LatestPayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const { data } = await api.get('/payments/recent');
                setPayments(data);
            } catch (err) {
                console.error('Failed to fetch payments', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
        <Card title="Latest Payments">
            {loading ? (
                <p className="p-4 text-center text-gray-500">Loading...</p>
            ) : payments.length === 0 ? (
                <p className="p-4 text-center text-gray-400">No recent payments found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-600">
                        <thead className="text-left">
                            <tr>
                                <th className="p-2">Tenant</th>
                                <th className="p-2">Amount</th>
                                <th className="p-2">Date</th>
                                <th className="p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={index} className="border-t">
                                    <td className="p-2">{payment.tenantName}</td>
                                    <td className="p-2">{payment.amount}</td>
                                    <td className="p-2">{payment.paymentDate}</td>
                                    <td className="p-2">
                                        <Badge label={payment.status} variant={statusColors[payment.status] || 'info'} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            </Card>
        </motion.div>
    );
};

export default LatestPayments;

import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import api from '../../utils/axios'; // adjust path if needed
import { motion } from 'framer-motion';
const priorityColors = {
    urgent: 'error',
    high: 'warning',
    normal: 'info',
};

const OpenMaintenanceRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const { data } = await api.get('/maintenance/open');
                setRequests(data);
            } catch (err) {
                console.error('Failed to fetch maintenance requests', err);
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
        <Card title="Open Maintenance Requests">
            {loading ? (
                <p className="p-4 text-center text-gray-500">Loading...</p>
            ) : requests.length === 0 ? (
                <p className="p-4 text-center text-gray-400">No open requests.</p>
            ) : (
                <div className="space-y-4">
                    {requests.map((req, index) => (
                        <div key={index} className="border rounded p-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition">
                            <div>
                                <h4 className="font-semibold">{req.title}</h4>
                                <p className="text-xs text-gray-500">{req.propertyName} • {req.createdAt}</p>
                            </div>
                            <Badge label={req.priority} variant={priorityColors[req.priority] || 'info'} />
                        </div>
                    ))}
                </div>
            )}
            </Card>
        </motion.div>
    );
};

export default OpenMaintenanceRequests;

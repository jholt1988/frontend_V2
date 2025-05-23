// src/features/reports/ReportsDashboard.jsx
import React, { useEffect } from 'react';
import useReports from './useReports';
import StatCard from '../../components/StatCard';
import { DollarSign, Users, Wrench } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { motion } from 'framer-motion';
const ReportsDashboard = () => {
    const { data, loadReports } = useReports();

    useEffect(() => {
        loadReports();
    }, []);

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">Reports Dashboard</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                <StatCard
                    icon={DollarSign}
                    label="Total Rent Collected"
                    value={`$${data.totalRent?.toFixed(2) || '0.00'}`}
                        color="green"
                    />
                    </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                <StatCard
                    icon={Users}
                    label="Active Leases"
                    value={data.activeLeases || 0}
                    color="blue"
                    />
                    </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                <StatCard
                    icon={Wrench}
                    label="Open Maintenance"
                    value={data.openMaintenance || 0}
                    color="red"
                    />
                </motion.div>
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h4 className="text-lg font-semibold mb-2">Monthly Rent Income</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.rentByMonth || []}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#4f46e5" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h4 className="text-lg font-semibold mb-2">Payments Over Time</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.paymentTrends || []}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="total" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ReportsDashboard;

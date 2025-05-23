import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import api from '../../utils/axios'; // adjust path if needed
import { motion } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const FinancialOverview = () => {
    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIncomeSummary = async () => {
            try {
                const { data } = await api.get('/payments/income-summary');
                setIncomeData(data); // Assuming { months: ['Jan', 'Feb'], totals: [10000, 12000] }
            } catch (err) {
                console.error('Failed to fetch income summary', err);
            } finally {
                setLoading(false);
            }
        };
        fetchIncomeSummary();
    }, []);

    const chartData = {
        labels: incomeData?.months || [],
        datasets: [
            {
                label: 'Income',
                data: incomeData?.totals || [],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', intersect: false },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 5000 },
            },
        },
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
        >
        <Card title="Financial Overview">
            <div className="h-64">
                {loading ? (
                    <p className="p-4 text-center text-gray-500">Loading chart...</p>
                ) : (
                    <Line data={chartData} options={options} />
                )}
            </div>
            </Card>
        </motion.div>
    );
};

export default FinancialOverview;

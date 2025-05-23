import React, { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/apiService";
import { Bar, Pie } from "react-chartjs-2";

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            }
        };
        fetchStats();
    }, []);

    if (!stats) return <p>Loading dashboard...</p>;

    const barData = {
        labels: ["Total Revenue", "Payments Made", "Overdue Payments"],
        datasets: [
            {
                label: "Financial Overview",
                data: [stats.totalRevenue, stats.totalPaid, stats.overduePayments],
                backgroundColor: ["#4CAF50", "#2196F3", "#F44336"],
            },
        ],
    };

    const pieData = {
        labels: ["Upcoming Leases", "Maintenance Requests"],
        datasets: [
            {
                label: "Activity",
                data: [stats.upcomingLeases, stats.maintenanceRequests],
                backgroundColor: ["#FF9800", "#673AB7"],
            },
        ],
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ width: "45%" }}>
                    <h3>Financial Overview</h3>
                    <Bar data={barData} />
                </div>
                <div style={{ width: "45%" }}>
                    <h3>Lease & Maintenance Overview</h3>
                    <Pie data={pieData} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

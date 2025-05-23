'use client";'
import AdminDashboard from "@/features/AdminDashboard";
import { useToast } from "@/lib/useToast";

const AdminDashboardPage = () => {
    const { success, error, warning, info } = useToast();

    return (
        <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <AdminDashboard />
        </div>
    );
    }

    export default AdminDashboardPage;
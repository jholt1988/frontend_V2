'use client';

import { useEffect, useState, useContext, useRef} from 'react';

import { getDashboardSummary } from '@/services/apiService';
import { getDashboardStats } from '@/services/apiService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import ExportControls from '@/components/ExportControls';
import useRequireAuth from '@/lib/useRequireAuth';
import RecentActivityTable from '@/components/ui/Charts/RecentActivityChart'
import withAuth from '@/lib/withAuth';

function AdminDashboard() {
   const { user, loading } = useRequireAuth(['admin', 'staff']);
  const [summary, setSummary] = useState({
    totalTenants: 0,
    totalPayments: 0,
    overduePayments: 0, 
    totalAmountPaid: 0,
    openMaintenance: 0,
    pendingPayments: 0,
    });
  const [isLoading, setIsLoading] = useState(loading);
  const [stats, getStats] = useState(0)
  const chartRef = useRef();
  console.log(user)

  useEffect(() => {
    if (user?.role === 'admin' || user?.role === 'staff' ) {
      getDashboardSummary()
        .then(setSummary)
        .catch((err) => console.error('Failed to fetch dashboard summary:', err))
        .finally(() => setIsLoading(false));

        getDashboardStats()
        .then(getStats)
        .catch((err) => console.error('Failed to fetch dashboard stats:', err))
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  if (!user &&
     (user.role !== 'admin' || user.role !== 'staff')) {
    return <p className="text-red-500">Unauthorized</p>;
  }

  if (isLoading) return <p>Loading dashboard...</p>;

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Tenants" value={summary.totalTenants || 0}/>
        <StatCard label="Payments Made" value={summary.totalPayments || 0} />
        <StatCard label="Overdue Payments" value={summary.overduePayments || 0} />
        <StatCard label="Amount Received" value={`$${summary.totalAmountPaid.toFixed(2)}`} />
        <StatCard label="Open Maintenance" value={summary.openMaintenance} />
        <StatCard label="Pending Payments" value={summary.pendingPayments} />
      </div>
      {stats && (
  <div ref={chartRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Monthly Payments</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={stats.monthlyPayments}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>

    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Maintenance Volume</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={stats.maintenanceByMonth}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
  )}


<LineChart
  data={stats.monthlyPayments}
  xKey="month"
  yKey="total"
  label="Monthly Revenue"
/>
<RecentActivityTable type="payments" />
<RecentActivityTable type="tenants" />
<RecentActivityTable type="requests" />


        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Export Data</h3>
            <ExportControls />
        </div>
    </div>
  );
}


function StatCard({ label, value }) {
  return (
    <div className="bg-gray-100 p-4 rounded shadow text-center">
      <p className="text-xl font-semibold text-gray-800">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}

export default withAuth(AdminDashboard,['admin', 'staff']);
'use client';

import AdminDashboard from '@/features/AdminDashboard';
import Card from '@/components/ui/Card';
import { useToast } from '@/lib/useToast';

function AdminDashboardPage() {
  const { success } = useToast();

  return (
    <Card className="max-w-6xl mx-auto mt-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => success('Dashboard refreshed')}
          className="text-sm text-accent underline"
        >
          Refresh
        </button>
      </div>

      <AdminDashboard />
    </Card>
  );
}

export default AdminDashboardPage


'use client';

import AdminDashboard from '@/features/AdminDashboard';
import { Card } from '@/components/ui';
import { useToast } from '@/components/ui/toast/ToastProvider';

export default function AdminDashboardPage() {
  const { showToast } = useToast();

  return (
    <Card className="max-w-6xl mx-auto mt-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => showToast('Dashboard refreshed', 'success')}
          className="text-sm text-accent underline"
        >
          Refresh
        </button>
      </div>

      <AdminDashboard />
    </Card>
  );
}

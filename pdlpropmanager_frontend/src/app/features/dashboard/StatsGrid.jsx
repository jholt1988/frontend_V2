'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/services/axiosInstance';
import { Card } from '@/components/ui';
import { Loader2 } from 'lucide-react';

export default function StatsGrid() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axiosInstance.get('/admin/stats/monthly');
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="animate-spin text-accent" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <StatCard title="Total Payments (12mo)" value={`$${total(stats.monthlyPayments)}`} />
      <StatCard title="Requests (12mo)" value={total(stats.maintenanceByMonth)} />
      <StatCard title="Current Month Revenue" value={`$${latest(stats.monthlyPayments)}`} />
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <Card className="p-4 shadow text-center bg-secondary">
      <h4 className="text-sm text-gray-400 mb-2">{title}</h4>
      <p className="text-2xl font-bold text-text">{value}</p>
    </Card>
  );
}

function total(data) {
  return data.reduce((acc, item) => acc + Number(item.total || item.count || 0), 0);
}

function latest(data) {
  const latest = data[data.length - 1];
  return latest ? latest.total : '0';
}

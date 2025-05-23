'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/services/axiosInstance';
import ResponsiveListTable from '@/components/ResponsiveListTable';
import { Card } from '@/components/ui';

export default function RecentActivityTable({ type = 'payments' }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const endpointMap = {
      tenants: '/admin/recent/tenants',
      payments: '/admin/recent/payments',
      requests: '/admin/recent/requests',
    };

    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(endpointMap[type]);
        setData(res.data);
      } catch (err) {
        console.error('Failed to fetch recent activity:', err);
      }
    };

    fetchData();
  }, [type]);

  const columnMap = {
    tenants: ['Name', 'Email', 'Joined'],
    payments: ['Tenant', 'Amount', 'Date'],
    requests: ['Title', 'Property', 'Status'],
  };

  const renderRow = {
    tenants: (item) => (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.createdAt?.slice(0, 10)}</td>
      </tr>
    ),
    payments: (item) => (
      <tr key={item.id}>
        <td>{item.tenantName}</td>
        <td>${item.amount}</td>
        <td>{item.date}</td>
      </tr>
    ),
    requests: (item) => (
      <tr key={item.id}>
        <td>{item.title}</td>
        <td>{item.propertyName}</td>
        <td>{item.status}</td>
      </tr>
    ),
  };

  return (
    <Card className="space-y-4">
      <h3 className="text-lg font-semibold capitalize">Recent {type}</h3>
      <ResponsiveListTable
        columns={columnMap[type]}
        data={data}
        keyField="id"
        renderRow={renderRow[type]}
      />
    </Card>
  );
}

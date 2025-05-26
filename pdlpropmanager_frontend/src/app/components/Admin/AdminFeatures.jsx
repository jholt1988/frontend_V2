'use client';
import Link from 'next/link';
import { useContext } from 'react';
import useRequireAuth from '@/lib/useRequireAuth';

export default function FeaturesPage() {
  const { user } = useRequireAuth(['admin', 'staff']);

  if (!user || (user.role !== 'admin' && user.role !== 'staff')) {
    return <p className="text-center text-red-600">Access denied: Admin or Staff only</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Admin / Staff Control Panel</h1>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <li className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">Tenants</h2>
          <p className="text-sm">Create, edit, delete, and assign leases</p>
          <Link href="/tenants" className="text-blue-600 underline">Manage Tenants</Link>
        </li>
        <li className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">Payments</h2>
          <p className="text-sm">View rent logs and payment history</p>
          <Link href="/payments" className="text-blue-600 underline">Review Payments</Link>
        </li>
        <li className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">Account Ledgers</h2>
          <p className="text-sm">View and edit tenant ledgers</p>
          <Link href="/ledgers" className="text-blue-600 underline">Manage Ledgers</Link>
        </li>
        <li className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">Maintenance</h2>
          <p className="text-sm">Update request status, assign contractors</p>
          <Link href="/maintenance" className="text-blue-600 underline">Manage Maintenance</Link>
        </li>
        <li className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">Documents</h2>
          <p className="text-sm">Upload or view tenant lease files</p>
          <Link href="/documents" className="text-blue-600 underline">Access Documents</Link>
        </li>
        <li className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <p className="text-sm">Send or review system messages</p>
          <Link href="/admin/notifications" className="text-blue-600 underline">Notification Center</Link>
        </li>
        <li className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">Analytics</h2>
          <p className="text-sm">Dashboard metrics and reports</p>
          <Link href="/admin/dashboard" className="text-blue-600 underline">View Dashboard</Link>
        </li>
      </ul>
    </div>
  );
}

import { useContext } from 'react';
import useRequireAuth from '@/lib/useRequireAuth';
import Link from 'next/link';

export default function AccountPage() {
  const { user, loading } = useRequireAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">My Account</h1>
      <div className="p-4 border rounded bg-white space-y-2">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/ledger" className="btn btn-outline">View Ledger</Link>
        <Link href="/maintenance" className="btn btn-outline">My Maintenance</Link>
        <Link href="/documents" className="btn btn-outline">My Documents</Link>
        <Link href="/payments" className="btn btn-outline">Make a Payment</Link>
      </div>
    </div>
  );
}

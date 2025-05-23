'use client';

import { useEffect, useState, useContext } from 'react';
import  AuthContext  from '@/context/AuthContext';
import { getAllPayments } from '@/services/apiService';

export default function PaymentsList() {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'staff' || user?.role === 'admin') {
      getAllPayments()
        .then((data) => setPayments(data))
        .catch((err) => console.error('Failed to load payments:', err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!user || !['staff', 'admin'].includes(user.role)) {
    return <p className="text-red-500">Unauthorized: Staff/Admin access only</p>;
  }

  if (loading) return <p>Loading payments...</p>;

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">All Payments</h2>

      {payments.length === 0 ? (
        <p>No payments recorded.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left p-2 border">Tenant ID</th>
              <th className="text-left p-2 border">Amount</th>
              <th className="text-left p-2 border">Status</th>
              <th className="text-left p-2 border">Paid At</th>
              <th className="text-left p-2 border">Recorded</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay) => (
              <tr key={pay.id} className="border-t">
                <td className="p-2 border">{pay.userId}</td>
                <td className="p-2 border">${pay.amount}</td>
                <td className="p-2 border">{pay.status}</td>
                <td className="p-2 border">{pay.paidAt ? new Date(pay.paidAt).toLocaleDateString() : '—'}</td>
                <td className="p-2 border">{new Date(pay.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

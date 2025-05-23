'use client';

import { useEffect, useState, useContext } from 'react';
import  AuthContext from '@/context/AuthContext';
import { getMyPayments } from '@/services/apiService';

export default function PaymentHistory() {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'tenant') {
      getMyPayments()
        .then((data) => setPayments(data))
        .catch((err) => console.error('Failed to load payment history:', err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!user || user.role !== 'tenant') {
    return <p className="text-red-500">Unauthorized: Tenants only</p>;
  }

  if (loading) return <p>Loading payment history...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Payment History</h2>

      {payments.length === 0 ? (
        <p>You have no payments recorded yet.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left p-2 border">Amount</th>
              <th className="text-left p-2 border">Status</th>
              <th className="text-left p-2 border">Paid At</th>
              <th className="text-left p-2 border">Recorded</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay) => (
              <tr key={pay.id} className="border-t">
                <td className="p-2 border">${pay.amount}</td>
                <td className="p-2 border">{pay.status}</td>
                <td className="p-2 border">
                  {pay.paidAt ? new Date(pay.paidAt).toLocaleDateString() : '—'}
                </td>
                <td className="p-2 border">{new Date(pay.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TenantLedger({ tenantId }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLedger() {
      try {
        const res = await axios.get(`/api/v1/ledgers/${tenantId}`);
        setEntries(res.data);
      } catch (err) {
        console.error('Failed to load ledger:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLedger();
  }, [tenantId]);

  const formatCurrency = (value) => `$${value.toFixed(2)}`;

  if (loading) return <p>Loading ledger...</p>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Tenant Ledger</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Balance After</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id} className={entry.type === 'charge' ? 'bg-red-50' : 'bg-green-50'}>
              <td className="p-2 border">{new Date(entry.date).toLocaleDateString()}</td>
              <td className="p-2 border capitalize">{entry.type}</td>
              <td className="p-2 border">{entry.description}</td>
              <td className="p-2 border">{formatCurrency(entry.amount)}</td>
              <td className="p-2 border">{formatCurrency(entry.balanceAfter)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
s
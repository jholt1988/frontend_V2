'use client';

import { useState, useEffect } from 'react';
import { getTenants } from '../services/apiService';
import Link from 'next/link';

export default function TenantDirectory() {
  const [query, setQuery] = useState('');
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getTenants(query).then(setTenants);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Tenant Directory</h2>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input mb-4"
      />

      {tenants.length === 0 ? (
        <p>No tenants found.</p>
      ) : (
        <ul className="divide-y">
          {tenants.map((t) => (
            <li key={t.id} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-gray-600">{t.email}</p>
              </div>
              <div className="flex gap-3 text-sm">
                <Link href={`/tenants/${t.id}/report`} className="text-blue-600 hover:underline">Report</Link>
                <Link href={`/tenant-profile/${t.id}`} className="text-blue-600 hover:underline">Profile</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

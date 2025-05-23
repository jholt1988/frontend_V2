// src/features/ledger/LedgerTable.jsx
import React from 'react';
import useLedger from './useLedger';

const LedgerTable = ({ tenantId, propertyId }) => {
    const { entries, loading } = useLedger({ tenantId, propertyId });

    if (loading) return <p className="p-4 text-gray-500">Loading ledger...</p>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded shadow">
                <thead className="bg-gray-100 text-sm text-gray-700">
                    <tr>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Description</th>
                        <th className="p-2 text-right">Debit</th>
                        <th className="p-2 text-right">Credit</th>
                        <th className="p-2 text-right">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry, i) => (
                        <tr key={i} className="border-t text-sm">
                            <td className="p-2">{new Date(entry.date).toLocaleDateString()}</td>
                            <td className="p-2">{entry.description}</td>
                            <td className="p-2 text-right">{entry.debit ? `$${entry.debit}` : ''}</td>
                            <td className="p-2 text-right">{entry.credit ? `$${entry.credit}` : ''}</td>
                            <td className="p-2 text-right font-medium">${entry.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default LedgerTable;
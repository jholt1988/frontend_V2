import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { showError } from '../ui/toast';
import { getRecentLeases } from '../../services/apiService';
import { motion } from 'framer-motion';

const statusColors = {
  active: 'success',
  pending: 'warning',
  expired: 'error',
};

const RecentLeases = () => {
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeases = async () => {
      try {
        const { data } = await getRecentLeases();
        setLeases(data);
      } catch (err) {
        showError('Failed to fetch recent leases');
      } finally {
        setLoading(false);
      }
    };
    fetchLeases();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
    <Card title="Recent Leases">
      {loading ? (
        <p className="p-4 text-center text-gray-500">Loading...</p>
      ) : leases.length === 0 ? (
        <p className="p-4 text-center text-gray-400">No recent leases found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-600">
            <thead className="text-left">
              <tr>
                <th className="p-2">Tenant</th>
                <th className="p-2">Property</th>
                <th className="p-2">Start Date</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {leases.map((lease) => (
                <tr key={lease.id} className="border-t">
                  <td className="p-2">{lease.tenantName}</td>
                  <td className="p-2">{lease.propertyName}</td>
                  <td className="p-2">{lease.startDate}</td>
                  <td className="p-2">
                    <Badge label={lease.status} variant={statusColors[lease.status] || 'info'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </Card>
      </motion.div>
  );
};

export default RecentLeases;

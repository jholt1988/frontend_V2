'use client';

import { useEffect, useState, useContext } from 'react';
import  AuthContext  from '@/context/AuthContext';
import {
  getMaintenanceRequests,
  updateMaintenanceStatus,
} from '@/services/apiService';

export default function MaintenanceList() {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (user && (user.role === 'staff' || user.role === 'admin')) {
      getMaintenanceRequests()
        .then((data) => setRequests(data))
        .catch((err) => console.error('Error fetching maintenance requests:', err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      const updated = await updateMaintenanceStatus(id, newStatus);
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: updated.status } : req))
      );
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (!user || !['staff', 'admin'].includes(user.role)) {
    return <p className="text-red-500">Unauthorized: Staff/Admin access only</p>;
  }

  if (loading) return <p>Loading maintenance requests...</p>;

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Maintenance Requests</h2>

      {requests.length === 0 ? (
        <p>No maintenance requests found.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li key={req.id} className="p-4 border rounded bg-gray-50 space-y-2">
              <p><strong>Description:</strong> {req.description}</p>
              <p><strong>Priority:</strong> {req.priority}</p>
              <p><strong>Created:</strong> {new Date(req.createdAt).toLocaleDateString()}</p>

              {req.photoUrl && (
                <p>
                  <strong>Photo:</strong>{' '}
                  <a href={req.photoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    View Image
                  </a>
                </p>
              )}

              <div className="flex items-center gap-2">
                <label><strong>Status:</strong></label>
                <select
                  value={req.status}
                  onChange={(e) => handleStatusChange(req.id, e.target.value)}
                  className="border px-2 py-1 rounded"
                  disabled={updatingId === req.id}
                >
                  <option value="Received">Received</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                {updatingId === req.id && <span className="text-sm text-gray-500">Updating...</span>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

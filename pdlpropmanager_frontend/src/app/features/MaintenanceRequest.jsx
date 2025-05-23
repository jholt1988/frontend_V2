'use client';

import { useState, useContext } from 'react';
import  AuthContext  from '@/context/AuthContext';
import { createMaintenanceRequest } from '@/services/apiService';
import { useRouter } from 'next/navigation';

export default function MaintenanceRequest() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    description: '',
    priority: 'medium',
    photoUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createMaintenanceRequest(formData);
      setSubmitted(true);
      setFormData({ description: '', priority: 'medium', photoUrl: '' });
    } catch (err) {
      console.error('Maintenance request failed:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'tenant') {
    return <p className="text-red-500">Unauthorized: Tenants only</p>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Submit Maintenance Request</h2>

      {submitted && <p className="text-green-600 mb-4">Request submitted successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the issue..."
          required
          className="input min-h-[100px]"
        />

        <select name="priority" value={formData.priority} onChange={handleChange} className="input">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="url"
          name="photoUrl"
          value={formData.photoUrl}
          onChange={handleChange}
          placeholder="Photo URL (optional)"
          className="input"
        />

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
}

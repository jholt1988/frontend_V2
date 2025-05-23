'use client';

import { useState, useContext,useRef } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { createPayment } from '@/services/apiService';
import { useRouter } from 'next/navigation';


export default function CreatePaymentForm() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const debounceTimer = useRef(null);

  const [formData, setFormData] = useState({
    userId: '',
    amount: '',
    status: 'paid',
    paidAt: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  
  const handleSearch = (query) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      if (!query.trim()) return setSearchResults([]);
      const results = await searchUsers(query);
      setSearchResults(results);
    }, 300);
  };
  
  const selectTenant = (user) => {
    setSelectedTenant(user);
    setFormData((prev) => ({ ...prev, userId: user.id }));
    setSearchResults([]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPayment(formData);
      setSuccessMsg('✅ Payment recorded successfully!');
      setFormData({ userId: '', amount: '', status: 'paid', paidAt: '' });
    } catch (err) {
      console.error('Payment creation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user || !['staff', 'admin'].includes(user.role)) {
    return <p className="text-red-500">Unauthorized: Staff/Admin only</p>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Payment</h2>

      {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
  <label className="block font-medium">Tenant</label>
  <input
    type="text"
    placeholder="Search by name or email..."
    onChange={(e) => handleSearch(e.target.value)}
    className="input"
  />
  {searchResults.length > 0 && (
    <ul className="bg-white border rounded max-h-40 overflow-y-auto">
      {searchResults.map((user) => (
        <li
          key={user.id}
          onClick={() => selectTenant(user)}
          className="p-2 hover:bg-blue-100 cursor-pointer"
        >
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  )}
  {selectedTenant && (
    <p className="text-sm text-green-600">Selected: {selectedTenant.name} (ID: {selectedTenant.id})</p>
  )}
</div>


        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="input"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="input"
        >
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </select>

        <input
          type="date"
          name="paidAt"
          value={formData.paidAt}
          onChange={handleChange}
          className="input"
        />

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Submit Payment'}
        </button>
      </form>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminLedgerManager() {
  const [tenantId, setTenantId] = useState('');
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ id: null, type: 'charge', description: '', amount: '' });
  const [tenants, setTenants] = useState([]);
  const [overallLedger, setOverallLedger] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/tenants').then(res => setTenants(res.data));
    axios.get('/api/v1/admin/recent/ledger').then(res => setOverallLedger(res.data));
  }, []);

  const fetchLedger = async () => {
    if (!tenantId) return;
    const res = await axios.get(`/api/v1/ledgers/${tenantId}`);
    setEntries(res.data);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (form.id) {
      await axios.put(`/api/v1/ledgers/entry/${form.id}`, { ...form, amount: parseFloat(form.amount) });
    } else {
      await axios.post(`/api/v1/ledgers/${tenantId}`, {
        ...form,
        amount: parseFloat(form.amount),
      });
    }
    setForm({ id: null, type: 'charge', description: '', amount: '' });
    fetchLedger();
  };

  const handleEdit = (entry) => {
    setForm({ id: entry.id, type: entry.type, description: entry.description, amount: entry.amount });
  };

  const handleDelete = async (entryId) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      await axios.delete(`/api/v1/ledgers/entry/${entryId}`);
      fetchLedger();
    }
  };

  const handleSendStatement = async () => {
    await axios.post(`/api/v1/ledgers/${tenantId}/send-statement`);
    alert('Statement sent');
  };

  return (
    <div className="max-w-6xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Ledger Management</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Overall Ledger Activity</h2>
        <table className="table w-full text-sm mb-6">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {overallLedger.map((entry, i) => (
              <tr key={i}>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>{entry.type}</td>
                <td>{entry.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <select onChange={e => setTenantId(e.target.value)} className="select select-bordered mb-4">
        <option value="">Select Tenant</option>
        {tenants.map(t => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>

      {tenantId && (
        <>
          <div className="mb-4">
            <button className="btn btn-primary mr-4" onClick={fetchLedger}>Load Ledger</button>
            <button className="btn btn-secondary" onClick={handleSendStatement}>Send Statement</button>
          </div>

          <form onSubmit={handleAddOrUpdate} className="space-y-2 mb-6">
            <h3 className="font-semibold">{form.id ? 'Edit Entry' : 'Add Charge'}</h3>
            <select name="description" value={form.description} onChange={handleFormChange} className="select select-bordered">
              <option value="">Select Type</option>
              <option value="Rent">Rent</option>
              <option value="Late Fee">Late Fee</option>
              <option value="Security Deposit">Security Deposit</option>
              <option value="Repair Fee">Repair Fee</option>
              <option value="Legal Fee">Legal Fee</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleFormChange}
              className="input input-bordered w-full"
              required
            />
            <button type="submit" className="btn btn-success">{form.id ? 'Update Entry' : 'Add Charge'}</button>
          </form>

          <table className="table w-full text-sm">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr key={i} className={entry.type === 'charge' ? 'bg-red-50' : 'bg-green-50'}>
                  <td>{new Date(entry.date).toLocaleDateString()}</td>
                  <td>{entry.type}</td>
                  <td>{entry.description}</td>
                  <td>${parseFloat(entry.amount).toFixed(2)}</td>
                  <td>${parseFloat(entry.balanceAfter).toFixed(2)}</td>
                  <td>
                    <button className="btn btn-xs btn-warning mr-2" onClick={() => handleEdit(entry)}>Edit</button>
                    <button className="btn btn-xs btn-error" onClick={() => handleDelete(entry.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

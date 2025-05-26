import { useState } from 'react';
import axios from 'axios';

export default function AddLedgerEntryForm({ tenantId, onEntryAdded }) {
  const [form, setForm] = useState({ type: 'charge', description: '', amount: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`/api/v1/ledgers/${tenantId}`, {
        ...form,
        amount: parseFloat(form.amount),
      });
      setForm({ type: 'charge', description: '', amount: '' });
      onEntryAdded();
    } catch (err) {
      console.error('Failed to add entry', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailStatement = async () => {
    try {
      await axios.post(`/api/v1/ledgers/${tenantId}/send-statement`);
      alert('Ledger statement sent');
    } catch (err) {
      console.error('Email failed', err);
      alert('Failed to send ledger statement');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <h3 className="text-lg font-semibold">Add Ledger Entry</h3>
      <select name="type" value={form.type} onChange={handleChange} className="select">
        <option value="charge">Charge</option>
        <option value="payment">Payment</option>
      </select>
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="input input-bordered w-full"
      />
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        className="input input-bordered w-full"
      />
      <div className="flex gap-4">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Add Entry'}
        </button>
        <button type="button" onClick={handleEmailStatement} className="btn btn-secondary">
          Send Statement
        </button>
      </div>
    </form>
  );
}

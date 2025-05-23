'use client';

import { useState } from 'react';
import { Input, Button } from '@/components/ui';

export default function PropertyForm({ initialData = {}, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: initialData.name || '',
    address: initialData.address || '',
    unitCount: initialData.unitCount || '',
    manager: initialData.manager || '',
    status: initialData.status || 'active',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {initialData?.id ? 'Edit Property' : 'Add Property'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Property Name"
            required
          />
          <Input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
          <Input
            name="unitCount"
            type="number"
            value={form.unitCount}
            onChange={handleChange}
            placeholder="Number of Units"
            required
          />
          <Input
            name="manager"
            value={form.manager}
            onChange={handleChange}
            placeholder="Manager Name"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
          </select>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData?.id ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

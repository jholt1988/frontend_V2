'use client';

import React, { useState } from 'react';
import ModalWrapper from '@/components/ModalWrapper';
import { Input, Button } from '@/components/ui';
import { useToast } from '@/components/ui/Toast/ToastProvider';

export default function PaymentForm({ initialData = {}, onClose, onSubmit }) {
  const { toast } = useToast();
  const [form, setForm] = useState({
    amount: '',
    method: '',
    status: 'Paid',
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    toast({
      title: 'Payment saved successfully',
      description: 'Your payment details have been saved.',
      status: 'success',
    });
  };

  return (
    <ModalWrapper title={initialData?.id ? 'Edit Payment' : 'Add Payment'} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
          <h3 className="text-xl font-semibold mb-4">
            {initialData?.id ? 'Edit Payment' : 'Add Payment'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="number"
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              required
            />

            <select
              name="method"
              value={form.method}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Method</option>
              <option value="Card">Card</option>
              <option value="Cash">Cash</option>
              <option value="Bank">Bank</option>
            </select>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>

            <div className="flex justify-end space-x-2">
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
    </ModalWrapper>
  );
}

// src/features/leases/LeaseForm.jsx
import React, { useState } from 'react';
import ModalWrapper from '../../components/ModalWrapper';

const LeaseForm = ({ initialData = {}, onClose, onSubmit }) => {
    const [form, setForm] = useState({
        tenantName: '',
        propertyName: '',
        startDate: '',
        endDate: '',
        status: 'Active',
        ...initialData
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
        <ModalWrapper onClose={onClose}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">
                    {initialData?.id ? 'Edit Lease' : 'Add Lease'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="tenantName"
                        placeholder="Tenant Name"
                        value={form.tenantName}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        type="text"
                        name="propertyName"
                        placeholder="Property Name"
                        value={form.propertyName}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        type="date"
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        type="date"
                        name="endDate"
                        value={form.endDate}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Expired">Expired</option>
                    </select>

                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                            {initialData?.id ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </ModalWrapper>
    );
};

export default LeaseForm;
 

// src/features/tenants/TenantForm.jsx
import React, { useState } from 'react';
import ModalWrapper from '../../components/ModalWrapper';

const TenantForm = ({ initialData = {}, onClose, onSubmit }) => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        axiosInstance.get('/properties').then(res => setProperties(res.data));
    }, []);

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
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
                        {initialData?.id ? 'Edit Tenant' : 'Add Tenant'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                        <select
                            name="propertyId"
                            value={form.propertyId || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="">Unassigned</option>
                            {properties.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
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

export default TenantForm;

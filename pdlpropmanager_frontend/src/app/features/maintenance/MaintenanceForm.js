// src/features/maintenance/MaintenanceForm.jsx
import React, { useState } from 'react';
import ModalWrapper from '../../components/ModalWrapper';

const MaintenanceForm = ({ initialData = {}, onClose, onSubmit }) => {
    const [form, setForm] = useState({
        title: '',
        propertyName: '',
        description: '',
        priority: 'Medium',
        status: 'Open',
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
                    {initialData?.id ? 'Edit Request' : 'New Request'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Request Title"
                        value={form.title}
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

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    ></textarea>

                    <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>

                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                            {initialData?.id ? 'Update' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
            </div>
            </ModalWrapper>
    );
};

export default MaintenanceForm;

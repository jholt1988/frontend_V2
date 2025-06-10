// src/features/notifications/NotificationForm.jsx
'use client'
import React, { useState } from 'react';
import useRequireAuth from '@/lib/useRequireAuth';


const NotificationForm = ({ initialData = {}, onClose, onSubmit,  }) => {
    const { user } = useRequireAuth();
    const [form, setForm] = useState({
        title: '',
        message: '',
        type: 'Info',
        isRead: false  ,
        userId: user.id,
        ...initialData
    });
   

  

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'isRead') {
            if (value === 'Unread') {
                setForm((prev) => ({ ...prev, [name]: false }));
            } else {
                setForm((prev) => ({ ...prev, [name]: true }));
            }
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        onClose();
    };
    

    return (
        <>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">
                    {initialData?.id ? 'Edit Notification' : 'New Notification'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />

                    <textarea
                        name="message"
                        placeholder="Message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    ></textarea>

                    <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="Info">Info</option>
                        <option value="Warning">Warning</option>
                        <option value="Alert">Alert</option>
                    </select>

                    <select
                        name="status"
                        value={form.isRead}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="Unread">Unread</option>
                        <option value="Read">Read</option>
                    </select>

                    <div className="flex justify-end space-x-2">
                        <button type="btn " onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                            {initialData?.id ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
            </div>
           
      
        </>
    );
};

export default NotificationForm;

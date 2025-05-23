// src/features/documents/DocumentUploadForm.jsx
import React, { useState } from 'react';

const DocumentUploadForm = ({ onClose, onUpload }) => {
    const [form, setForm] = useState({ title: '', description: '', file: null });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.file) return;

        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('description', form.description);
        formData.append('file', form.file);

        await onUpload(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Upload Document</h3>
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
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    ></textarea>
                    <input
                        type="file"
                        name="file"
                        onChange={handleChange}
                        required
                        className="w-full"
                    />
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DocumentUploadForm;

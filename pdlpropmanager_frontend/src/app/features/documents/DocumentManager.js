// src/features/documents/DocumentManager.jsx
import React, { useState } from 'react';
import useDocuments from './useDocument';
import DocumentUploadForm from './DocumentUploadForm';

const DocumentManager = () => {
    const {
        documents,
        loading,
        uploadDocument,
        deleteDocument
    } = useDocuments();

    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Documents</h2>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Upload Document
                </button>
            </div>

            {loading ? (
                <p>Loading documents...</p>
            ) : (
                <ul className="space-y-3">
                    {documents.map((doc) => (
                        <li key={doc.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
                            <div>
                                <h4 className="font-semibold">{doc.title}</h4>
                                <p className="text-sm text-gray-600">{doc.description}</p>
                                <p className="text-xs text-gray-400">Uploaded: {new Date(doc.uploadedAt).toLocaleString()}</p>
                            </div>
                            <div className="space-x-2">
                                <a
                                    href={doc.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    View
                                </a>
                                <button
                                    onClick={() => deleteDocument(doc.id)}
                                    className="px-3 py-1 bg-red-500 text-white rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {isFormOpen && (
                <DocumentUploadForm
                    onClose={() => setIsFormOpen(false)}
                    onUpload={uploadDocument}
                />
            )}
        </div>
    );
};

export default DocumentManager;

// src/features/documents/useDocuments.js
import { useState, useEffect } from 'react';
import {
    getDocuments,
    uploadDocument as apiUpload,
    deleteDocument as apiDelete
} from './document.api';
import { toast } from 'react-toastify';

const useDocuments = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    const refreshDocuments = async () => {
        try {
            const { data } = await getDocuments();
            setDocuments(data);
        } catch {
            toast.error('Failed to fetch documents');
        } finally {
            setLoading(false);
        }
    };

    const uploadDocument = async (formData) => {
        try {
            await apiUpload(formData);
            toast.success('Uploaded successfully');
            refreshDocuments();
        } catch {
            toast.error('Upload failed');
        }
    };

    const deleteDocument = async (id) => {
        try {
            await apiDelete(id);
            toast.success('Deleted successfully');
            refreshDocuments();
        } catch {
            toast.error('Delete failed');
        }
    };

    useEffect(() => {
        refreshDocuments();
    }, []);

    return {
        documents,
        loading,
        uploadDocument,
        deleteDocument
    };
};

export default useDocuments;

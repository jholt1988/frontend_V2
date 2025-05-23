import React, { useEffect, useState } from "react";
import { fetchDocuments, uploadDocument, downloadDocument, deleteDocument } from "../../services/apiService"; // Adjust the import path as necessary

const DocumentsList = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const getDocuments = async () => {
            try {
                const data = await fetchDocuments();
                setDocuments(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getDocuments();
    }, []);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            await uploadDocument(formData);
            const updatedDocuments = await fetchDocuments();
            setDocuments(updatedDocuments);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDownload = async (id) => {
        try {
            await downloadDocument(id);
            alert("Document downloaded!");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDocument(id);
            setDocuments(documents.filter((doc) => doc.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading documents...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Document Management</h2>
            <ul>
                {documents.map((doc) => (
                    <li key={doc.id}>
                        {doc.name}
                        <button onClick={() => handleDownload(doc.id)}>Download</button>
                        <button onClick={() => handleDelete(doc.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h3>Upload a New Document</h3>
            <input type="file" onChange={handleFileUpload} />
        </div>
    );
};

export default DocumentsList;

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TenantDocumentUpload({ tenantId }) {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    const res = await axios.get(`/api/v1/documents/${tenantId}`);
    setFiles(res.data.files);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('document', file);
    await axios.post(`/api/v1/documents/${tenantId}`, formData);
    setFile(null);
    fetchFiles();
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleUpload} className="flex gap-2 items-center">
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
      <ul className="list-disc ml-4">
        {files.map((f, i) => (
          <li key={i}>
            <a href={`/uploads/${tenantId}/${f}`} target="_blank" className="text-blue-600 underline">{f}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

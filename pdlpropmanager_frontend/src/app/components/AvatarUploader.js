// src/components/AvatarUploader.jsx
import React, { useRef, useState } from 'react';

const AvatarUploader = ({ onUpload }) => {
    const [preview, setPreview] = useState(null);
    const fileRef = useRef();

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setPreview(URL.createObjectURL(file));
        onUpload(file);
    };

    return (
        <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border">
                {preview ? (
                    <img src={preview} alt="avatar" className="object-cover w-full h-full" />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                        +
                    </div>
                )}
            </div>
            <button
                onClick={() => fileRef.current.click()}
                className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
            >
                Upload Avatar
            </button>
            <input
                type="file"
                accept="image/*"
                hidden
                ref={fileRef}
                onChange={handleChange}
            />
        </div>
    );
};

export default AvatarUploader;

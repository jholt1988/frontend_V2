// src/components/ModalWrapper.jsx
import React from 'react';
import {cn} from '../utils/cn'

const ModalWrapper = ({ title, children, onClose }) => {
    return (
        <div className="fixex inset-0 bg-black/30 backdrop-blur sm flex items-center justify-center z-50 y-auto">
            <div className=" fixed inset-0 bg-white transition-opacity p-6 rounded-xl shadow-2xl w-fit-content max-w-md animate-scale-in">
                < div classname="relative  transform overflow-hidden bg-white rounded-lg shadow dark:bg-gray-700 y-auto" />
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 text-lg font-bold"
                    >
                        &128
                    </button>
                </div>
                {children}
            </div>
            </div>
        
    );
};

export default ModalWrapper;

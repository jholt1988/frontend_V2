'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function ModalWrapper({ title, onClose, children }) {
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          key="modal-content"
          className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          aria-labelledby="modal-title"
        >
          {title && (
            <div className="flex justify-between items-center mb-4">
              <h3 id="modal-title" className="text-lg font-semibold">
                {title}
              </h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    typeof window !== 'undefined' ? document.body : null
  );
}

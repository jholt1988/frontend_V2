'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useModal } from './Modal';

export default function ModalContent() {
  const { open, hide, content } = useModal();

  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape') hide();
  }, [hide]);

  useEffect(() => {
    if (open) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, handleEscape]);

  if (!open) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={hide}
      >
        <motion.div
          key="modal"
          className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={hide} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
          {content}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

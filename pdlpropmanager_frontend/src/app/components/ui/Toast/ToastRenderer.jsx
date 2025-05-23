'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';

const getIcon = (variant) => {
  switch (variant) {
    case 'success': return <CheckCircle className="w-5 h-5 text-white mr-2" />;
    case 'error': return <XCircle className="w-5 h-5 text-white mr-2" />;
    case 'warning': return <AlertTriangle className="w-5 h-5 text-white mr-2" />;
    case 'info':
    default: return <Info className="w-5 h-5 text-white mr-2" />;
  }
};

export default function ToastRenderer({ toasts = [] }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map(({ id, msg, variant }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className={`flex items-center px-4 py-2 rounded shadow text-white ${
              variant === 'success'
                ? 'bg-green-600'
                : variant === 'error'
                ? 'bg-red-600'
                : variant === 'warning'
                ? 'bg-yellow-500'
                : 'bg-gray-800'
            }`}
          >
            {getIcon(variant)}
            {typeof msg === 'string' ? <span>{msg}</span> : msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

'use client';

import { useContext, createContext, useState, useCallback } from 'react';
import ToastRenderer from '@/components/ui/Toast/ToastRenderer';
const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((msg, variant = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  // Helper shortcuts
  const toastHelpers = {
    success: (msg, duration) => showToast(msg, 'success', duration),
    error: (msg, duration) => showToast(msg, 'error', duration),
    warning: (msg, duration) => showToast(msg, 'warning', duration),
    info: (msg, duration) => showToast(msg, 'info', duration),
  };

  return (
    <ToastContext.Provider value={{ showToast, ...toastHelpers }}>
      {children}
      <ToastRenderer toasts={toasts} />
    </ToastContext.Provider>
  );
};
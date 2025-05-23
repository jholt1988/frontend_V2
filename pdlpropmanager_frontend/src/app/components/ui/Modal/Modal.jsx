'use client';

import { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const Modal = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(null);

  const show = (node) => {
    setContent(node);
    setOpen(true);
  };

  const hide = () => {
    setOpen(false);
    setTimeout(() => setContent(null), 200); // wait for exit animation
  };

  return (
    <ModalContext.Provider value={{ open, show, hide, content }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

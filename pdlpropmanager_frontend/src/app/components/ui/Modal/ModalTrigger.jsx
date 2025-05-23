'use client';

import { useModal } from './Modal';

export default function ModalTrigger({ children, render }) {
  const { show } = useModal();

  return (
    <button onClick={() => show(render())}>
      {children}
    </button>
  );
}

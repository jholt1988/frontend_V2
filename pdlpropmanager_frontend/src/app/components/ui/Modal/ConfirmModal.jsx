'use client';

import { useModal } from './Modal';
import { Button } from '@/components/ui';

export default function ConfirmModal({ title = 'Are you sure?', message, onConfirm }) {
  const { hide } = useModal();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      {message && <p className="text-sm text-gray-600">{message}</p>}
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={hide}>Cancel</Button>
        <Button variant="danger" onClick={() => { onConfirm(); hide(); }}>Confirm</Button>
      </div>
    </div>
  );
}

'use client';

import { useToast } from '@/lib/useToast';
import {Modal, ModalContent, ModalTrigger} from '@/components/ui/Modal';

import ConfirmModal from '@/components/ui/modal/ConfirmModal';

export default function PaymentManager() {
  const { success } = useToast();

  const handleDelete = async (id) => {
    await deletePayment(id);
    success('Payment deleted');
  };

  return (
    <Modal>
      {/* ... */}
      <td>
        <ModalTrigger
          render={() => (
            <ConfirmModal
              title="Delete Payment?"
              message="This action is irreversible."
              onConfirm={() => handleDelete(payment.id)}
            />
          )}
        >
          <button className='btn border-b-cyan-700' type="button">Delete</button>
        </ModalTrigger>
      </td>
      <ModalContent />
    </Modal>
  );
}

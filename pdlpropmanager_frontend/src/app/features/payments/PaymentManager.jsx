'use client';

import { useToast } from '@/components/ui/toast/ToastProvider';
import { Modal, ModalTrigger, ModalContent } from '@/components/ui/modal';
import ConfirmModal from '@/components/ui/modal/ConfirmModal';

export default function PaymentManager() {
  const { showToast } = useToast();

  const handleDelete = async (id) => {
    await deletePayment(id);
    showToast('Payment deleted', 'success');
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
          <Button variant="danger">Delete</Button>
        </ModalTrigger>
      </td>
      <ModalContent />
    </Modal>
  );
}

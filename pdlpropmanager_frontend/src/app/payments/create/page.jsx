import CreatePaymentForm from "@/features/CreatePaymentForm";


        import { Modal, ModalTrigger, ModalContent } from '@/components/ui/modal';
        import PaymentForm from '@/features/payments/PaymentForm';
        
        export default function CreatePaymentPage() {
          return (
            <Modal>
              <div>
                <ModalTrigger render={() => <PaymentForm />}>
                  <button className="btn btn-primary">Add Payment</button>
                </ModalTrigger>
        
                <ModalContent />
              </div>
            </Modal>
          );
        }
        
    
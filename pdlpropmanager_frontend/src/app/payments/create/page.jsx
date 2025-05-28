


        import ModalTrigger from '@/components/ui/Modal';
        import PaymentForm from '@/features/payments/PaymentForm';
        
        export default function CreatePaymentPage() {
          return (
            <>
                <ModalTrigger render={() => <PaymentForm />}>
                  <button className="btn btn-primary">Add Payment</button>
                </ModalTrigger>

            </>
          );
        }
        
    
'use client';

import PaymentManager from '@/features/payments/PaymentManager';
import StripePaymentButton from '@/features/payments/StripePaymentButton';
import { Card } from '@/components/ui';

export default function PaymentManagerPage() {
  return (
    <Card className="max-w-3xl mx-auto mt-6">
      <h1 className="text-3xl font-bold mb-4">Payments List</h1>
      <PaymentManager />
      <h2 className="text-2xl font-semibold mt-8 mb-4">Make a Payment</h2>
      <p className="mb-4">Use the button below to make a payment via Stripe.</p>
      <StripePaymentButton />
    </Card>
  );
}

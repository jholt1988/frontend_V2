'use client';

import PaymentManager from '@/features/payments/PaymentManager';
import { Card } from '@/components/ui';

export default function PaymentManagerPage() {
  return (
    <Card className="max-w-3xl mx-auto mt-6">
      <h1 className="text-3xl font-bold mb-4">Payments List</h1>
      <PaymentManager />
    </Card>
  );
}

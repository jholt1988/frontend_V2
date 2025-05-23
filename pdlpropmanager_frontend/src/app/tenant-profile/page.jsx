'use client';

import TenantProfile from '@/features/TenantProfile';
import { Card } from '@/components/ui';

export default function TenantProfilePage() {
  return (
    <Card className="max-w-3xl mx-auto mt-6">
      <h1 className="text-3xl font-bold mb-4">Tenant Profile</h1>
      <TenantProfile />
    </Card>
  );
}

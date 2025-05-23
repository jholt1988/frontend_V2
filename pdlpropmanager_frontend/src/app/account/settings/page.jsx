'use client';

import AccountSettings from '@/features/account/AccountSettings';
import { Card } from '@/components/ui';

export default function AccountSettingsPage() {
  return (
    <Card className="max-w-2xl mx-auto mt-8 space-y-6">
      <h1 className="text-3xl font-bold">Account Settings</h1>
      <AccountSettings />
    </Card>
  );
}

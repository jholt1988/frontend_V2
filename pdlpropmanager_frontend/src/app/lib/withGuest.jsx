'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function withGuest(Component) {
  return function GuestOnly(props) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && user) {
        if (user.role === 'admin') {
          router.replace('/dashboard');
        } else if (user.role === 'tenant') {
          router.replace('/tenant-profile');
        }
      }     
    }, [ ]);

    if (loading || user) {
      return <div className="p-6">Redirecting...</div>;
    }

    return <Component {...props} />;
  };
}

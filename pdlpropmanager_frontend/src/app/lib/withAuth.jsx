'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function withAuth(Component, allowedRoles = []) {
  return function ProtectedComponent(props) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && (!user || (allowedRoles.length && !allowedRoles.includes(user.role)))) {
        router.replace('/login');
      }
    }, [user, loading, router]);

    if (loading || !user || (allowedRoles.length && !allowedRoles.includes(user.role))) {
      return <div className="p-6">Loading or redirecting...</div>;
    }

    return <Component {...props} />;
  };
}

'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function withAuth(Component, allowedRoles = []) {
  return function ProtectedComponent(props) {
    const { user, loading } = useAuth();
    const router = useRouter();
    console.log('withAuth', { user, loading, allowedRoles });

    useEffect(() => {
      if (loading && (!user || (allowedRoles.length > 0 && !allowedRoles.includes(user.role)))) {
        router.replace('/login');
      }
    }, [loading, user, allowedRoles, router]);

    if ( !user || (allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
      return <div className="p-6">Loading or redirecting...</div>;
    }

    return <Component {...props} />;
  };
}

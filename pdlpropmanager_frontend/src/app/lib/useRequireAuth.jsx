'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function useRequireAuth(roles = []) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || (roles.length && !roles.includes(user.role))) {
        router.replace('/login');
      }
    }
  }, [user, loading, router, roles]);

  return { user, loading };
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function useRequireAuth(roles = [], isPublic = false) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('Auth State:', { user, loading, isPublic });
    
    if (!loading) {
      // Skip auth check for public routes
      if (isPublic) return;

      // Check authentication and roles for protected routes
      if (!user || (roles.length > 0 && !roles.includes(user.role))) {
        router.replace('/login');
      }
    }
  }, [user, loading, router, roles, isPublic]);

  return { user, loading };
}
'use client';

import { createContext, useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Check expiration
        if (decoded.exp * 1000 < Date.now()) {
          throw new Error('Token expired');
        }

        setUser(decoded);
      } catch (err) {
        console.error('Invalid or expired token:', err);
        localStorage.removeItem('token');
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      router.replace('/dashboard'); // or dynamic based on role
    } catch (err) {
      console.error('Token decoding failed:', err);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);

    try {
      router.push('/login');
    } catch (err) {
      console.error('Redirect failed:', err);
    }
  };

  if (loading) return <div className="p-6">Loading user...</div>;

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

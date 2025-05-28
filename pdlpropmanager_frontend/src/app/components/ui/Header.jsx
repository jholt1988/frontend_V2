import Link from 'next/link';
import { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import NotificationBell from '@/components/NotificationBell';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <Link href="/" className="text-lg font-bold">PM App</Link>

      <nav className="flex items-center gap-4 relative">
        {user && (
          <>
            {user.role === 'admin' && <Link href="/admin">Admin Panel</Link>}
            {user.role === 'staff' && <Link href="/maintenance">Staff Dashboard</Link>}
            {user.role === 'tenant' && <Link href="/account">My Account</Link>}
            <NotificationBell userId={user.id} />

            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen(!menuOpen)} className="btn btn-sm btn-outline">
                {user.name}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded z-50 text-sm">
                  <Link href="/account" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

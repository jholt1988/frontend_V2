// src/components/Sidebar.jsx
import React from 'react';
import Link from 'next/link';
import { Home, FileText, Users, Settings, Bell } from 'lucide-react';

const Sidebar = ({user, handleLogout}) => {
   const links = [
      { roles:user?.role === 'tenant' || user?.role === 'admin', to: '/', label: 'Dashboard', icon: <Home size={18} /> },
      { roles: user?.role === 'admin',to: '/properties', label: 'Properties', icon: <FileText size={18} /> },
      { roles: user?.role === 'admin',to: '/tenants', label: 'Tenants', icon: <Users size={18} /> },
      { roles: user?.role === 'admin',to: '/payments', label: 'Payments', icon: <FileText size={18} /> },
      {roles: user?.role === 'tenant',to: '/payments/history', label: 'My Payments', icon: <FileText size={18} /> },
      { roles: user?.role === 'admin',to: '/leases', label: 'Leases', icon: <FileText size={18} /> },
      { roles:user?.role === 'tenant' || user?.role === 'admin',to: '/maintenance', label: 'Maintenance', icon: <Settings size={18} /> },
      {roles:user?.role === 'tenant' || user?.role === 'admin', to: '/notifications', label: 'Notifications', icon: <Bell size={18} /> },
      { roles: user?.role === 'admin',to: '/reports', label: 'Reports', icon: <FileText size={18} /> },
      {roles: user?.role === 'admin', to: '/documents', label: 'Documents', icon: <FileText size={18} /> }
   ];
   // {user?.role === 'tenant' || user?.role === 'admin' && (
   //    <>
   //      <Link href="/" className="block hover:text-blue-400">Dashboard</Link>
   //    </>
   //  )}
   //  {user?.role === 'tenant' && (
   //    <>
   //      <Link href="/tenant-profile" className="block hover:text-blue-400">My Profile</Link>
   //      <Link href="/maintenance/request" className="block hover:text-blue-400">Submit Maintenance</Link>
   //    </>
   //  )}
   //  {['staff', 'admin'].includes(user?.role) && (
   //    <>
   //      <Link href="/maintenance" className="block hover:text-blue-400">View Maintenance</Link>
   //      <Link href="/payments" className="block hover:text-blue-400">Payments</Link>
   //    </>
   //  )}
   //  {user?.role === 'tenant' && (
   //    <Link href="/payments/history" className="block hover:text-blue-400">
   //      My Payments
   //    </Link>
   //  )}
   //  {['admin', 'staff'].includes(user?.role) && (
   //    <Link href="/dashboard" className="block hover:text-blue-400">
   //      Dashboard
   //    </Link>
   //  )}
   //  {['staff', 'admin'].includes(user?.role) && (
   //    <Link href="/tenants" className="block hover:text-blue-400">Tenant Directory</Link>
   //  )}
    

   return (
      <aside className="w-64 h-full bg-white shadow-lg fixed top-0 left-0 hidden md:flex flex-col z-40">
         <div className="p-4 border-b font-bold text-lg">PDL Rentals</div>
         <nav className="flex-1 overflow-y-auto">
            <ul className="p-2 space-y-1">
               {links.map((link) => (
                  <li key={link.to}>
                     {link.roles &&(
                     <Link
                        href={link.to}
                        className={({ isActive }) =>
                           `flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-100 transition ${isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600'
                           }`
                        }
                     >
                        {link.icon}
                        <span>{link.label}</span> 
                     </Link>
                     )}
                    
                  </li>
                  
               ))}
            </ul>

            { user && (
    <button onClick={handleLogout} className="mt-4 text-red-400 hover:text-red-300">
      Logout
    </button>)}
         </nav>
      </aside>
   );
};

export default Sidebar;

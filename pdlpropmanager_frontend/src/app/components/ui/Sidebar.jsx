
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ links }) => (
  <aside className="w-64 h-screen bg-white shadow-md fixed top-0 left-0 z-40">
    <div className="p-6 font-bold text-xl border-b">PDL Rentals</div>
    <nav className="mt-4 space-y-1">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            \`block px-6 py-3 text-sm font-medium \${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}\`
          }
        >
          {link.icon && <link.icon className="inline-block mr-2 w-4 h-4" />}
          {link.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;

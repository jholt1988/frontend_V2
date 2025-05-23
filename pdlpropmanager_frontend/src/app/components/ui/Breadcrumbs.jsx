
import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ items }) => (
  <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1">
      {items.map((item, index) => (
        <li key={index} className="inline-flex items-center">
          {index !== 0 && <span className="mx-1">/</span>}
          {item.path ? (
            <Link to={item.path} className="hover:underline text-blue-600">{item.label}</Link>
          ) : (
            <span className="text-gray-500">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;

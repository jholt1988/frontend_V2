'use client';

export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-secondary text-text p-6 rounded shadow-md ${className}`}>
      {children}
    </div>
  );
}

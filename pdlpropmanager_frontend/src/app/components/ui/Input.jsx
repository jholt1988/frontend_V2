'use client';

export default function Input({ type = 'text', className = '', ...props }) {
  return (
    <input
      type={type}
      className={`w-full px-4 py-2 rounded border border-border bg-secondary text-text placeholder-gray-400 focus:outline-none focus:border-accent transition-colors duration-300 ${className}`}
      {...props}
    />
  );
}

'use client';

export default function Badge({ children, variant = 'default', className = '' }) {
  const base = 'px-2 py-1 text-xs font-semibold rounded';
  const variants = {
    default: 'bg-border text-text',
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-500 text-black',
    danger: 'bg-red-600 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

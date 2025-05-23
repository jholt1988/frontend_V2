'use client';

export default function Button({ children, type = 'button', variant = 'primary', onClick, className = '', ...props }) {
  const base =
    'px-4 py-2 rounded font-semibold transition-colors duration-300 focus:outline-none focus:ring-2';
  const variants = {
    primary: 'bg-accent text-primary hover:bg-highlight',
    secondary: 'bg-secondary text-text hover:bg-accent',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant] || ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

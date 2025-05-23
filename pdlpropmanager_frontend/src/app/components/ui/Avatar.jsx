
import React from 'react';
import { cn } from '../../utils/cn';

const Avatar = ({ src, alt, size = 'md', fallback }) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
  };

  return (
    <div className={cn('inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold', sizes[size])}>
      {src ? (
        <img src={src} alt={alt} className="rounded-full object-cover w-full h-full" />
      ) : (
        fallback || '?'
      )}
    </div>
  );
};

export default Avatar;

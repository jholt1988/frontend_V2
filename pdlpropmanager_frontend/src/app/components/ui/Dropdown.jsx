
import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ label, items = [] }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          {label}
        </button>
      </div>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="py-1">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;


import React, { useState } from 'react';

const Tabs = ({ tabs, onChange, defaultIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleTabClick = (index) => {
    setActiveIndex(index);
    onChange && onChange(index);
  };

  return (
    <div className="flex space-x-2 border-b mb-4">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => handleTabClick(index)}
          className={\`px-4 py-2 text-sm font-medium border-b-2 \${activeIndex === index ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}\`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;

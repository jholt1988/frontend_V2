
import React from 'react';

const PaginationControls = ({ currentPage, maxPage, onNext, onPrev, onGoTo }) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
      >
        Prev
      </button>

      {Array.from({ length: maxPage }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => onGoTo(num)}
          className={`px-3 py-1 rounded ${num === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={onNext}
        disabled={currentPage === maxPage}
        className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;

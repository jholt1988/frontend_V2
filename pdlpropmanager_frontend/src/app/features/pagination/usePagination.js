
import { useState, useMemo } from 'react';

const usePagination = (data = [], itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, maxPage));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goToPage = (page) => setCurrentPage(Math.min(Math.max(1, page), maxPage));

  return {
    currentPage,
    maxPage,
    paginatedData,
    nextPage,
    prevPage,
    goToPage
  };
};

export default usePagination;

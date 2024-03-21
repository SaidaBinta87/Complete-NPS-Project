import React from 'react';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        {/* Previous button */}
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            className={`flex items-center justify-center px-3 h-8 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="sr-only">Previous</span>
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
            </svg>
          </button>
        </li>
        {/* Page numbers */}
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === number ? 'text-blue-600 border border-blue-300 bg-blue-50' : 'text-gray-500 border border-gray-300'} hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              {number}
            </button>
          </li>
        ))}
        {/* Next button */}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            className={`flex items-center justify-center px-3 h-8 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="sr-only">Next</span>
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

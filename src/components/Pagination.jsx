import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const getPageRange = () => {
    if (totalPages <= 5) {
      return pageNumbers;
    } else if (currentPage <= 3) {
      return pageNumbers.slice(0, 5);
    } else if (currentPage >= totalPages - 2) {
      return pageNumbers.slice(totalPages - 5, totalPages);
    } else {
      return pageNumbers.slice(currentPage - 3, currentPage + 2);
    }
  };

  const renderPageNumbers = () => {
    const range = getPageRange();

    return range.map((pageNumber, index) => (
      <li
        key={pageNumber}
        className={`cursor-pointer rounded-full w-8 h-8 flex items-center justify-center ${
          pageNumber === currentPage
            ? "bg-indigo-400 text-white"
            : "bg-gray-200 text-gray-600"
        }`}
        onClick={() => onPageChange(pageNumber)}
      >
        {pageNumber}
      </li>
    ));
  };

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex items-center space-x-2">
        {/* Backward arrow */}
        {currentPage > 1 && (
          <li
            className="cursor-pointer rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600"
            onClick={() => onPageChange(currentPage - 1)}
          >
            &lt;
          </li>
        )}

        {/* Display page numbers */}
        {renderPageNumbers()}

        {/* Forward arrow */}
        {currentPage < totalPages && (
          <li
            className="cursor-pointer rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600"
            onClick={() => onPageChange(currentPage + 1)}
          >
            &gt;
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;

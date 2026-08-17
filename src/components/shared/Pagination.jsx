"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      {/* Previous */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/20 bg-base-200 text-accent transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
      >
        <FaChevronLeft className="text-xs" />
      </button>

      {/* Pages */}
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`h-9 min-w-9 rounded-lg px-3 text-sm transition ${
            currentPage === page
              ? "bg-primary text-white"
              : "border border-accent/20 bg-base-200 text-accent hover:border-primary hover:text-primary cursor-pointer"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/20 bg-base-200 text-accent transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
      >
        <FaChevronRight className="text-xs" />
      </button>
    </div>
  );
};

export default Pagination;

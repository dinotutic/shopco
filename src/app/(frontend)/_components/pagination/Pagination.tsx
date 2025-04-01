"use client";

import { FC } from "react";
import { getPageNumbers } from "../../../lib/paginationUtils"; // Import the helper function
import useHandleNavigation from "@/app/lib/navigationHelpers";

interface PaginationProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  productCount?: number;
  page: number;
  perPage: number;
  nextPageLink?: string;
  prevPageLink?: string;
}

const Pagination: FC<PaginationProps> = ({
  hasNextPage,
  hasPrevPage,
  nextPageLink,
  prevPageLink,
  productCount,
  page,
  perPage,
}) => {
  const totalPages = Math.ceil(Number(productCount) / Number(perPage));
  const pageNumbers = getPageNumbers(page, totalPages);
  const { handlePrevious, handleNext, handlePageClick } = useHandleNavigation();
  return (
    <div className="flex justify-between items-center gap-2 my-4">
      <button
        className="bg-blue-500 text-white p-1"
        disabled={!hasPrevPage || !prevPageLink}
        onClick={() => handlePrevious(prevPageLink)}
      >
        ← Previous
      </button>

      <div className="flex items-center gap-1">
        {pageNumbers.map((pageNum) =>
          typeof pageNum === "number" ? (
            <button
              key={pageNum}
              className={`p-1 ${
                pageNum === page ? "bg-blue-700 text-white" : "bg-gray-200"
              }`}
              onClick={() => handlePageClick(pageNum)}
            >
              {pageNum}
            </button>
          ) : (
            <span key={pageNum} className="p-1">
              {pageNum}
            </span>
          )
        )}
      </div>

      <button
        className="bg-blue-500 text-white p-1"
        disabled={!hasNextPage || !nextPageLink}
        onClick={() => handleNext(nextPageLink)}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;

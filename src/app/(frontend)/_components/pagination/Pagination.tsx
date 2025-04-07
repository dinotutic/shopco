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
  pageLinks: string[]; // Array of precomputed page URLs
}

const Pagination: FC<PaginationProps> = ({
  hasNextPage,
  hasPrevPage,
  nextPageLink,
  prevPageLink,
  productCount,
  page,
  perPage,
  pageLinks,
}) => {
  const totalPages = Math.ceil(Number(productCount) / Number(perPage));
  const pageNumbers = getPageNumbers(page, totalPages);
  const { handlePrevious, handleNext, handlePageClick } = useHandleNavigation();

  return (
    <div className="flex justify-between items-center gap-2 my-6 w-full">
      <PaginationButton
        label="← Previous"
        onClick={() => handlePrevious(prevPageLink)}
        disabled={!hasPrevPage || !prevPageLink}
      />

      <div className="flex items-center gap-1">
        {pageNumbers.map((pageNum, index) =>
          typeof pageNum === "number" ? (
            <button
              key={index}
              className={`px-4 py-2 rounded-xl text-gray-600 ${
                pageNum === page
                  ? "bg-gray-100 text-black"
                  : "hover:bg-gray-100"
              }`}
              onClick={() =>
                handlePageClick(pageNum, () => pageLinks[pageNum - 1])
              }
            >
              {pageNum}
            </button>
          ) : (
            <span key={`${pageNum}-${index}`} className="p-1">
              {pageNum}
            </span>
          )
        )}
      </div>
      <PaginationButton
        label="Next →"
        onClick={() => handleNext(nextPageLink)}
        disabled={!hasNextPage || !nextPageLink}
      />
    </div>
  );
};

export default Pagination;

interface PaginationButtonProps {
  label: string;
  onClick: () => void;
  disabled: boolean;
}

const PaginationButton: FC<PaginationButtonProps> = ({
  label,
  onClick,
  disabled,
}) => {
  return (
    <button
      className="border rounded-lg px-4 py-2 hover:bg-gray-100"
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

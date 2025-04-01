"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

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
  const router = useRouter();
  return (
    <div className="flex gap-2 border">
      <button
        className="bg-blue-500 text-white p-1"
        disabled={!hasPrevPage || !prevPageLink}
        onClick={() => {
          if (prevPageLink) router.push(prevPageLink);
        }}
      >
        ← Previous
      </button>

      <div>
        {page} / {Math.ceil(Number(productCount) / Number(perPage))}
      </div>

      <button
        className="bg-blue-500 text-white p-1"
        disabled={!hasNextPage || !nextPageLink}
        onClick={() => {
          if (nextPageLink) router.push(nextPageLink);
        }}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;

"use client";
import { Review } from "@/app/types/shared.types";
import React, { useState } from "react";
import TableComponent from "../TableComponent";
import SearchComponent from "../SearchComponent";
import ReviewsActions from "./ReviewsActions";
import { filterReviews } from "@/app/lib/filterUtil";

interface ReviewsListProps {
  reviews: Review[];
}
const ReviewsList = ({ reviews }: ReviewsListProps) => {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  const filteredReviews = filterReviews(reviews, search);

  const tableHeaders = [
    { id: "id", label: "ID", render: (row: Review) => row.id },
    { id: "customer", label: "Customer", render: (row: any) => row.user.name },
    { id: "product", label: "Product", render: (row: any) => row.product.name },
    { id: "rating", label: "Rating", render: (row: any) => row.rating },
    { id: "comment", label: "Comment", render: (row: any) => row.comment },
    {
      id: "date",
      label: "Date",
      render: (row: any) => row.createdAt.toLocaleDateString("de-DE"),
    },
    {
      id: "highlighted",
      label: "Highlighted",
      render: (row: any) => (row.highlighted ? "Yes" : "No"),
    },
    {
      id: "actions",
      label: "Actions",
      render: (row: any) => <ReviewsActions review={row} />,
    },
  ];

  const sortOptions = [
    { value: "Rating: Low to High", label: "ratingAsc" },
    { value: "Rating: High to Low", label: "ratingDesc" },
    { value: "Date: Old to New", label: "dateAsc" },
    { value: "Date: New to Old", label: "dateDesc" },
    { value: "Comment Included: Yes", label: "commentIncluded" },
    { value: "Comment Included: No", label: "commentNotIncluded" },
  ];
  return (
    <div className="overflow-x-auto">
      <div className="flex my-8 justify-between items-center">
        <h1 className="text-xl text-gray-500">Filters:</h1>
        <div>
          <SearchComponent
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </div>
      </div>
      <TableComponent data={filteredReviews} headers={tableHeaders} />
    </div>
  );
};

export default ReviewsList;

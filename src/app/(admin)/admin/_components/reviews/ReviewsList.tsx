"use client";
import { Review } from "@/app/types/shared.types";
import React from "react";
import TableComponent from "../TableComponent";
import SearchComponent from "../SearchComponent";
import { filterReviews } from "@/app/lib/filterUtil";
import { tableHeaders, sortOptions, filterOptions } from "./reviewConstants";
import useReviewFilters from "../../hooks/useReviewFilters";
import { filterHandlers } from "./filterHandlers";
import SortComponent from "../SortComponent";
import { sortReviews } from "@/app/lib/sortUtils";
import FilterComponent from "../FilterComponent";

interface ReviewsListProps {
  reviews: Review[];
}
const ReviewsList = ({ reviews }: ReviewsListProps) => {
  const { filterState, setFilterField } = useReviewFilters();
  const { search, sort, commentFilter, ratingFilter, highlightedFilter } =
    filterState;
  const {
    handleSearchChange,
    handleSortChange,
    handleCommentChange,
    handleRatingChange,
    handleHighlightedChange,
  } = filterHandlers(setFilterField);

  const filteredReviews = filterReviews(
    reviews,
    search,
    commentFilter,
    ratingFilter,
    highlightedFilter
  );
  const sortedReviews = sortReviews(filteredReviews, sort);
  return (
    <div className="overflow-x-auto">
      <div className="flex my-8 justify-between items-center">
        <h1 className="text-xl text-gray-500">Filters:</h1>
        <div>
          <SearchComponent
            value={search}
            onChange={handleSearchChange}
            placeholder="Search"
          />
          <SortComponent
            value={sort}
            onChange={handleSortChange}
            options={sortOptions}
            placeholder="Sort by"
          />
          <FilterComponent
            value={commentFilter}
            onChange={handleCommentChange}
            options={filterOptions.commentFilter}
            placeholder="Comment"
          />
          <FilterComponent
            value={ratingFilter}
            onChange={handleRatingChange}
            options={filterOptions.ratingOptions}
            placeholder="Rating"
          />
          <FilterComponent
            value={highlightedFilter}
            onChange={handleHighlightedChange}
            options={filterOptions.highlightedOptions}
            placeholder="Highlighted"
          />
        </div>
      </div>
      <TableComponent data={sortedReviews} headers={tableHeaders} />
    </div>
  );
};

export default ReviewsList;

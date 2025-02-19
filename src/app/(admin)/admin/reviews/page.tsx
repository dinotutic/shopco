import React from "react";
import PageHeader from "../_components/PageHeader";
import { getAllReviews } from "@/db/reviewQueries";
import ReviewsList from "../_components/reviews/ReviewsList";

export const ReviewsPage = async () => {
  const reviews = await getAllReviews();
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <PageHeader>Reviews</PageHeader>
      </div>
      <ReviewsList reviews={reviews} />
    </>
  );
};

export default ReviewsPage;

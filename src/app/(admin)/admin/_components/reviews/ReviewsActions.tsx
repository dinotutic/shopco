"use client";
import useReviews from "../../hooks/useReviews";
import ReviewModal from "./ReviewModal";
import { Review } from "@/app/types/shared.types";

const ReviewsActions = ({ review }: { review: Review }) => {
  const {
    isModalOpen,
    isLoading,
    handleViewClick,
    handleHighlight,
    reviewState,
  } = useReviews({ review });
  return (
    <div className="flex items-center justify-center max-w-fit">
      <button
        onClick={() => handleViewClick()}
        className="border rounded-md px-2 bg-gray-400 text-secondaryText hover:bg-secondaryBackground"
      >
        View
      </button>
      {isModalOpen && (
        <ReviewModal
          review={review}
          handleViewClick={handleViewClick}
          handleHighlight={handleHighlight}
          isLoading={isLoading}
          reviewState={reviewState}
        />
      )}
    </div>
  );
};

export default ReviewsActions;

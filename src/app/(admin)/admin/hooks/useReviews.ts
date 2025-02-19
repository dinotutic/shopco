import { Review } from "@/app/types/shared.types";
import { highlightReview } from "@/db/reviewQueries";
import { useState } from "react";

const useReviews = ({ review }: { review: Review }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Using reviewState to be able to update the highlighted state of the review without refreshing/re-fetching the data
  const [reviewState, setReviewState] = useState<Review>(review);

  const handleViewClick = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      window.location.reload();
    }
    setIsModalOpen(true);
  };

  const handleHighlight = async (reviewId: number, isHighlighted: boolean) => {
    setIsLoading(true);
    await highlightReview(reviewId, isHighlighted);
    setReviewState((prevReviewState) => ({
      ...prevReviewState,
      highlighted: !isHighlighted,
    }));
    setIsLoading(false);
  };

  return {
    isModalOpen,
    isLoading,
    reviewState,
    handleViewClick,
    handleHighlight,
  };
};

export default useReviews;

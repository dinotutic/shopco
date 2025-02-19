import { Review } from "@/app/types/shared.types";
import renderStars from "@/app/lib/renderStars";
import HighLightButton from "./HighlightButton";

const ReviewModal = ({
  review,
  handleViewClick,
  handleHighlight,
  isLoading,
  reviewState,
}: {
  review: Review;
  handleViewClick: (review: Review) => void;
  handleHighlight: (reviewId: number, isHighlighted: boolean) => void;
  isLoading: boolean;
  reviewState: Review;
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => handleViewClick(review)}
    >
      <div
        className="bg-white p-8 rounded shadow-lg relative w-8/12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => handleViewClick(review)}
          className="absolute top-2 right-2"
        >
          X
        </button>
        <h2 className="text-xl mb-4">Review Details</h2>
        <p>
          <strong>Customer:</strong> {review.user.name}
        </p>
        <p>
          <strong>Product:</strong> {review.product.name}
        </p>
        <p>
          <strong>Rating: </strong>
          <span>
            {renderStars(review.rating)} {review.rating}
          </span>
        </p>
        <p>
          <strong>Comment:</strong> {review.comment}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(review.createdAt).toLocaleDateString("de-DE")}
        </p>
        <p>
          <strong>Highlighted: </strong>
          <span>{reviewState.highlighted ? "Yes" : "No"}</span>
        </p>
        <HighLightButton
          reviewId={review.id}
          isHighlighted={reviewState.highlighted}
          handleHighlight={handleHighlight}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ReviewModal;

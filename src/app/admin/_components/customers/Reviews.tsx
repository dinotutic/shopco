import renderStars from "@/app/lib/renderStars";
import { Review } from "../shared.types";

interface ReviewProps {
  reviews: Review[];
  toggleReviews: () => void;
  showReviews: boolean;
}

const Reviews = ({ reviews, toggleReviews, showReviews }: ReviewProps) => {
  return (
    <section className="mb-6 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      <button
        onClick={toggleReviews}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
        aria-expanded={showReviews}
      >
        {showReviews ? "Hide Reviews" : "Show Reviews"}
      </button>
      {showReviews && <RenderReviews reviews={reviews} />}
    </section>
  );
};

const RenderReviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className="mb-2 p-2 border-b">
              <p className="text-gray-700">
                <span className="font-semibold">Review ID:</span> {review.id}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Rating:</span>{" "}
                {renderStars(review.rating)}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Comment:</span> {review.comment}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews found</p>
      )}
    </div>
  );
};

export default Reviews;

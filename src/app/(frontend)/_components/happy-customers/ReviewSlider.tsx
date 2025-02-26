import renderStars from "@/app/lib/renderStars";
import { Review } from "@/app/types/shared.types";
import verified from "@/../public/svg/verified.svg";
import Image from "next/image";
import ReviewCard from "./ReviewCard";

interface ReviewCardProps {
  reviews: Omit<Review, "product">[];
}

const ReviewSlider = ({ reviews }: ReviewCardProps) => {
  return (
    <div className="relative w-full h-full my-8">
      {/* Left Gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-20 gradient-left"></div>
      {/* Right Gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-12 z-20 gradient-right"></div>
      <div
        id="slider"
        className="flex py-3 gap-5 w-full h-full scroll-smooth overflow-x-hidden overflow-y-hidden flex-nowrap hide-scrollbar relative z-10"
      >
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewSlider;

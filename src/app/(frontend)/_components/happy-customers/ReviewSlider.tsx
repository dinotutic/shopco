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
    <div
      id="slider"
      className="flex gap-5 p-10 w-full h-full scroll-smooth overflow-x-scroll flex-nowrap"
    >
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewSlider;

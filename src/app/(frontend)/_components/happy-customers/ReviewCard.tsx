import renderStars from "@/app/lib/renderStars";
import { Review } from "@/app/types/shared.types";
import verified from "@/../public/svg/verified.svg";
import Image from "next/image";

interface ReviewCardProps {
  review: Omit<Review, "product">;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div
      className="flex flex-col border gap-3 rounded-xl p-7 w-[400px] h-[240px] hover:scale-105 ease-in-out duration-300 shrink-0"
      key={review.id}
    >
      <span className="">{renderStars(review.rating)}</span>
      <h3 className="flex gap-2 text-xl font-satoshiMedium">
        {review.user.name}
        <Image src={verified} alt="Verified icon" />
      </h3>
      <p>{review.comment}</p>
    </div>
  );
};

export default ReviewCard;

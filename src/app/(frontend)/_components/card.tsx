import { Product, Review } from "@/app/types/shared.types";
import { formatCurrency } from "@/app/lib/formatters";
import { averageRating } from "@/app/lib/productHelpers";
import renderStars from "@/app/lib/renderStars";
import Image from "next/image";

interface CardProps {
  product: Omit<Product, "reviews" | "user"> & {
    reviews: Omit<Review, "product" | "user">[];
  };
}

const Card = async ({ product }: CardProps) => {
  const rating = await averageRating(product.reviews);
  return (
    <div className="flex flex-col items-start justify-start rounded-2xl gap-2 min-w-48 max-w-72 w-full">
      <div className="rounded-2xl relative overflow-hidden w-full h-48 lg:h-60 xl:h-72">
        {product.images[0]?.url && (
          <Image
            src={product.images[0].url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 60vw, 72vw"
            className="object-cover"
          />
        )}
      </div>
      <h2 className="text-base md:text-xl font-satoshiMedium w-full truncate">
        {product.name}
      </h2>
      <span className="text-xs md:text-md text-gray-500">
        {renderStars(rating)} {rating}
      </span>
      <span className="text-xl md:text-2xl font-satoshiMedium">
        {formatCurrency(product.priceInCents)}
      </span>
    </div>
  );
};

export default Card;

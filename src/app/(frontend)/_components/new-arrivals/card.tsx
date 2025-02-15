import { Product } from "@/app/(admin)/admin/_components/shared.types";
import { formatCurrency } from "@/app/lib/formatters";
import { averageRating } from "@/app/lib/productHelpers";
import renderStars from "@/app/lib/renderStars";
import Image from "next/image";

interface CardProps {
  product: Product;
}

const Card = async ({ product }: CardProps) => {
  const rating = await averageRating(product.reviews);
  console.log("product: ", product);
  console.log("images: ", product.images);
  return (
    <div className="w-min flex flex-col items-start justify-start rounded-2xl gap-2">
      <div className="w-48 h-48 md:h-72 md:w-72 rounded-2xl relative overflow-hidden">
        {product.images[0]?.url && (
          <Image
            src={product.images[0].url}
            alt={product.name}
            fill
            sizes="20vw"
          />
        )}
      </div>
      <h2 className="text-base md:text-xl font-satoshiMedium">
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

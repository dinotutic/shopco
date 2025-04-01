"use client";

import { Product, Review } from "@/app/types/shared.types";
import Card from "../card";

interface ProductProps {
  initialProducts: (Omit<Product, "reviews" | "user"> & {
    reviews: Omit<Review, "product" | "user">[];
  })[];
  filters: {
    category: string | null;
    style: string | null;
    color: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    gender: "men" | "women" | "unisex";
  };
}
const Products = ({ initialProducts }: ProductProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
      {initialProducts.length === 0 && (
        <p className="text-md p-10">No products found :(</p>
      )}
      {initialProducts?.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;

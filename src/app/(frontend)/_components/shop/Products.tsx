"use client";

import { Product, Review } from "@/app/types/shared.types";
import Card from "../card";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/db/productQueries";
import { RESULTS_PER_PAGE } from "../../(shop)/shop/[gender]/page";

interface ProductProps {
  initialProducts: (Omit<Product, "reviews" | "user"> & {
    reviews: Omit<Review, "product" | "user">[];
  })[];
  filters: {
    category: string | null;
    style: string | null;
    color: string | null;
    gender: "men" | "women" | "unisex";
  };
}
const Products = ({ initialProducts, filters }: ProductProps) => {
  const {
    data: products,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["products", { ...filters }],
    queryFn: () => getProducts(filters, RESULTS_PER_PAGE),
    initialData: initialProducts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products</div>;

  return (
    <div className="flex gap-10 flex-wrap">
      {products?.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;

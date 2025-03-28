"use client";
// FIX SIZING FOR PRODUCTS. NEED TO BE DYNAMIC
import { Product, Review } from "@/app/types/shared.types";
import Card from "../card";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/db/productQueries";
import { RESULTS_PER_PAGE } from "../../(shop)/shop/[gender]/page";
import Loading from "@/app/(frontend)/_components/ui/Loading";

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
const Products = ({ initialProducts, filters }: ProductProps) => {
  const {
    data: products,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["products", { ...filters }],
    queryFn: () => getProducts(filters, RESULTS_PER_PAGE),
    initialData: initialProducts,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (isError) return <div>Error fetching products</div>;

  return (
    <div className="flex gap-10 flex-wrap items-center justify-start z-[-1]">
      {products?.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;

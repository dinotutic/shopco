import { Product, Review } from "@/app/types/shared.types";
import Card from "../card";

interface ProductProps {
  products: (Omit<Product, "reviews" | "user"> & {
    reviews: Omit<Review, "product" | "user">[];
  })[];
}
const Products = async ({ products }: ProductProps) => {
  return (
    <div className="flex gap-10 flex-wrap">
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;

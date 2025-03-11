import { ProductFilters } from "@/app/types/shared.types";

interface ProductProps {
  gender: string;
  filters: ProductFilters;
}
const Products = ({ gender, filters }: ProductProps) => {
  const { category, style, color } = filters;
  return (
    <div>
      <h1>gender: {gender}</h1>
      <h1>category: {category}</h1>
      <h1>style: {style}</h1>
      <h1>color: {color}</h1>
    </div>
  );
};

export default Products;

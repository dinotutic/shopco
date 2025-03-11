import { ProductFilters } from "@/app/types/shared.types";
import Products from "../../_components/shop/Products";

interface ShopProps {
  params: { gender: "men" | "women" | "unisex" };
  searchParams: ProductFilters;
}
const Shop = async ({ params, searchParams }: ShopProps) => {
  const { gender } = await params;
  const { category = null, style = null, color = null } = await searchParams;
  const filters = { category, style, color };
  const genderCapitalized = gender.charAt(0).toUpperCase() + gender.slice(1);

  return (
    <section>
      <Products gender={genderCapitalized} filters={filters} />
    </section>
  );
};

export default Shop;

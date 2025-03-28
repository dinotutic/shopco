import { ProductFilters } from "@/app/types/shared.types";
import Products from "../../../_components/shop/Products";
import { getProducts } from "@/db/productQueries";
import { createTitle } from "@/app/lib/textFormatting";
import ProductsHeader from "../../../_components/shop/ProductsHeader";

export const RESULTS_PER_PAGE = 9;

export interface ShopProps {
  params: { gender: "men" | "women" | "unisex" };
  searchParams: ProductFilters;
}
const Shop = async ({ params, searchParams }: ShopProps) => {
  const { gender } = await params;
  const { category, style, color, minPrice, maxPrice } = await searchParams;
  const filters = { category, style, color, gender, minPrice, maxPrice };
  const title = createTitle([gender, category, style]);
  const initialProducts = await getProducts(filters, RESULTS_PER_PAGE);

  return (
    <section className="max-w-[1440px] w-full flex flex-col items-start justify-start overflow-hidden ">
      <ProductsHeader title={title} />
      <Products initialProducts={initialProducts} filters={filters} />
    </section>
  );
};

export default Shop;

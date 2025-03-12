import { ProductFilters } from "@/app/types/shared.types";
import Products from "../../_components/shop/Products";
import { fetchProducts } from "@/db/productQueries";
import { createTitle } from "@/app/lib/textFormatting";
import ProductsHeader from "../../_components/shop/ProductsHeader";

interface ShopProps {
  params: { gender: "men" | "women" | "unisex" };
  searchParams: ProductFilters;
}
const Shop = async ({ params, searchParams }: ShopProps) => {
  const { gender } = await params;
  const { category, style, color } = await searchParams;
  const filters = { category, style, color };

  const products = await fetchProducts(filters, gender, 9);
  const title = createTitle([gender, category, style]);
  return (
    <section className="max-w-[1440px] w-full flex flex-col items-center justify-center overflow-hidden">
      <ProductsHeader title={title} />
      <Products products={products} />
    </section>
  );
};

export default Shop;

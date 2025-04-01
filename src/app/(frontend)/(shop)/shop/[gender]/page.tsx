import { ProductFilters } from "@/app/types/shared.types";
import Products from "../../../_components/shop/Products";
import { getProducts } from "@/db/productQueries";
import { createTitle } from "@/app/lib/textFormatting";
import ProductsHeader from "../../../_components/shop/ProductsHeader";
import Pagination from "@/app/(frontend)/_components/pagination/Pagination";
import getPaginationValues from "@/app/lib/paginationUtil";

export const RESULTS_PER_PAGE = 9;

export interface ShopProps {
  params: { gender: "men" | "women" | "unisex" };
  searchParams: ProductFilters;
}
const Shop = async ({ params, searchParams }: ShopProps) => {
  const { gender } = await params;
  // use this filters in Pagination to not loose filters when changing pages
  const {
    category,
    style,
    color,
    minPrice,
    maxPrice,
    page,
  } = // destructure perPage if needed later
    await searchParams;

  const filters = {
    category: category || null,
    style: style || null,
    color: color || null,
    gender: gender || null,
    minPrice: minPrice ? minPrice : null,
    maxPrice: maxPrice ? maxPrice : null,
  };
  const title = createTitle([gender, category, style]);

  // Pagination
  const {
    selectedPage,
    skip,
    productCount,
    // totalPages,
    hasNextPage,
    hasPrevPage,
    nextPageLink,
    prevPageLink,
  } = await getPaginationValues({
    page,
    gender,
    resultsPerPage: RESULTS_PER_PAGE,
    filters,
  });
  const initialProducts = await getProducts(filters, RESULTS_PER_PAGE, skip);

  return (
    <section className="max-w-[1440px] w-full border">
      <div className="w-full flex flex-col items-start justify-start overflow-hidden">
        <ProductsHeader title={title} />
        <Products initialProducts={initialProducts} filters={filters} />
      </div>
      <hr className="border-t border-gray-100 my-6" />
      <Pagination
        hasPrevPage={hasPrevPage}
        prevPageLink={prevPageLink ?? undefined}
        hasNextPage={hasNextPage}
        nextPageLink={nextPageLink ?? undefined}
        productCount={productCount}
        page={selectedPage}
        perPage={RESULTS_PER_PAGE}
      />
    </section>
  );
};

export default Shop;

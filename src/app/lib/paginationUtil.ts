import { getProductCount } from "@/db/productQueries";

interface getPaginationValuesProps {
  page: number | null;
  gender: string;
  resultsPerPage: number;
  filters: {
    category: string | null;
    style: string | null;
    color: string | null;
    gender: "men" | "women" | "unisex";
    minPrice: number | null;
    maxPrice: number | null;
  };
}

const buildUrl = (
  gender: string = "",
  filters: {
    category: string | null;
    style: string | null;
    color: string | null;
    minPrice: number | null;
    maxPrice: number | null;
  },
  page: number,
  perPage: number
) => {
  const url = new URLSearchParams();

  if (filters.category) url.append("category", filters.category);
  if (filters.style) url.append("style", filters.style);
  if (filters.color) url.append("color", filters.color);
  if (filters.minPrice) url.append("minPrice", filters.minPrice.toString());
  if (filters.maxPrice) url.append("maxPrice", filters.maxPrice.toString());
  url.append("page", page.toString());
  url.append("perPage", perPage.toString());

  return `/shop/${gender}?${url.toString()}`;
};

const getPaginationValues = async ({
  page,
  gender,
  resultsPerPage,
  filters,
}: getPaginationValuesProps) => {
  const selectedPage = Number(page ?? "1");
  const skip = (selectedPage - 1) * resultsPerPage;

  // NEED TO ADD FILERS HERE
  const { productCount, totalPages } = await getProductCount(
    gender,
    resultsPerPage,
    filters
  );
  const hasNextPage = selectedPage < totalPages;
  const hasPrevPage = selectedPage > 1;

  const nextPageLink = hasNextPage
    ? buildUrl(gender, filters, selectedPage + 1, resultsPerPage)
    : null;

  const prevPageLink = hasPrevPage
    ? buildUrl(gender, filters, selectedPage - 1, resultsPerPage)
    : null;

  return {
    selectedPage,
    skip,
    productCount,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPageLink,
    prevPageLink,
  };
};

export default getPaginationValues;

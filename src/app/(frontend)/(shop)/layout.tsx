import type { Metadata } from "next";
import "../../globals.css";
import FilterLayout from "../_components/filter-layout/FilterLayout";
import { FilterProvider } from "../_components/filter-layout/FilterContext";
import { getFilters } from "@/db/productQueries";

export const metadata: Metadata = {
  title: "ShopCo - Your Fashion Destination",
  description:
    "Discover the latest trends in fashion and shop a wide range of clothing, accessories, and more at ShopCo.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const filters = await getFilters();

  return (
    <FilterProvider>
      <div className="flex flex-col md:flex-row max-w-[1440px] mx-auto w-full relative">
        <FilterLayout filters={filters} />
        {children}
      </div>
    </FilterProvider>
  );
}

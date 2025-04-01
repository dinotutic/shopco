"use client";
import Filters from "./Filters";
import { useFilterContext } from "./FilterContext";
import { Category, Style, Color, Size } from "@/app/types/shared.types";

interface FilterLayoutProps {
  filters: {
    categories: Category[];
    styles: Style[];
    colors: Color[];
    sizes: Size[];
    price: { min: number; max: number };
  };
}
const FilterLayout = ({ filters }: FilterLayoutProps) => {
  const { isFilterShown, toggleFilter } = useFilterContext();

  return (
    <>
      {/* Dark background overlay for small screens */}
      {isFilterShown && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleFilter} // Close filters when clicking outside
        ></div>
      )}

      <div
        className={`
          ${isFilterShown ? "block" : "hidden"} 
          md:block w-full md:w-96 h-min p-6 border rounded-3xl absolute md:static z-20 bg-white mr-6`}
      >
        <Filters filters={filters} />
      </div>
    </>
  );
};

export default FilterLayout;

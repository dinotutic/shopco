"use client";

import { Category, Color, Style, Size } from "@/app/types/shared.types";
import FilterTitle from "./FilterTitle";
import AppleFilterBtn from "./AppleFilterBtn";
import filter_icon from "@/../public/svg/filter_icon.svg";
import Image from "next/image";
import CategoryFilter from "./categories-styles/CategoryFilter";
import PriceFilter from "./PriceFilter";
import ColorPicker from "./color-picker/ColorPicker";
import SizesFilter from "./SizesFilter";
import StylesFilter from "./categories-styles/StylesFilter";
import useFilter from "@/app/hooks/useFilters";
import usePriceFilter from "@/app/hooks/usePriceFilter";
import generateUrl from "@/app/lib/generateFilterUrl";

interface FiltersProps {
  filters: {
    categories: Category[];
    styles: Style[];
    colors: Color[];
    sizes: Size[];
    price: { min: number; max: number };
  };
}
const Filters = ({ filters }: FiltersProps) => {
  const {
    toggleIsFilterOpen,
    selectFilter,
    getSelectedFilters,
    menuToggle,
    isFilterOpen,
    isFilterSelected,
  } = useFilter(filters);

  const {
    handlePriceRangeChange,
    getPriceRange,
    isPriceRangeMenuOpen,
    togglePriceRangeMenu,
  } = usePriceFilter();

  const handleMenuToggle = () => {
    menuToggle();
    togglePriceRangeMenu();
  };

  // Generate search queries in URL on submit
  const selectedFilters = getSelectedFilters();
  const { selectedCategories, selectedStyles, selectedColors, selectedSizes } =
    selectedFilters;
  const selectedPrices = getPriceRange();
  const filterParams = generateUrl({ selectedFilters, selectedPrices });

  return (
    <div className="w-96 h-min p-6 border rounded-3xl flex-wrap flex flex-col gap-4">
      <div className="flex justify-between items-center w-full">
        <FilterTitle title="Filters" />
        <button onClick={handleMenuToggle}>
          <Image src={filter_icon} alt="filter icon" />
        </button>
      </div>
      <hr className="w-full" />
      <CategoryFilter
        categories={filters.categories}
        isFilterOpen={isFilterOpen}
        toggleIsFilterOpen={toggleIsFilterOpen}
        selectFilter={selectFilter}
        isFilterSelected={isFilterSelected}
      />
      <hr />
      <PriceFilter
        isFilterOpen={isPriceRangeMenuOpen}
        toggleIsFilterOpen={togglePriceRangeMenu}
        handlePriceRangeChange={handlePriceRangeChange}
        getPriceRange={getPriceRange}
      />
      <hr />
      <ColorPicker
        availableColors={filters.colors}
        isFilterOpen={isFilterOpen}
        toggleIsFilterOpen={toggleIsFilterOpen}
        selectColor={selectFilter}
        isColorSelected={isFilterSelected}
      />
      <hr />
      <SizesFilter
        sizes={filters.sizes}
        isFilterOpen={isFilterOpen}
        toggleIsFilterOpen={toggleIsFilterOpen}
        selectFilter={selectFilter}
        isFilterSelected={isFilterSelected}
      />
      <hr />
      <StylesFilter
        styles={filters.styles}
        isFilterOpen={isFilterOpen}
        toggleIsFilterOpen={toggleIsFilterOpen}
        selectFilter={selectFilter}
        isFilterSelected={isFilterSelected}
      />
      <AppleFilterBtn filterParams={filterParams} />
    </div>
  );
};

export default Filters;

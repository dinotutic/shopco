"use client";

import { Category, Color, Style, Size } from "@/app/types/shared.types";
import FilterTitle from "./FilterTitle";
import ApplyFilterBtn from "./ApplyFilterBtn";
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
import { useFilterContext } from "./FilterContext";

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
  // const { selectedCategories, selectedStyles, selectedColors, selectedSizes } =
  //   selectedFilters;
  const selectedPrices = getPriceRange();
  const filterParams = generateUrl({ selectedFilters, selectedPrices });

  // const isGenderSelected = usePathname() === "/shop" ? false : true;

  const { isFilterShown, toggleFilter } = useFilterContext();

  return isFilterShown ? (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center w-full">
        <FilterTitle title="Filters" />
        <FilterToggleButton
          handleMenuToggle={handleMenuToggle}
          toggleFilter={toggleFilter}
        />
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
      <ApplyFilterBtn filterParams={filterParams} />
    </div>
  ) : null;
};

export default Filters;

export const FilterToggleButton = ({
  handleMenuToggle,
  toggleFilter,
}: {
  handleMenuToggle: () => void;
  toggleFilter: () => void;
}) => {
  return (
    <>
      <button onClick={handleMenuToggle}>
        <Image
          src={filter_icon}
          alt="filter icon"
          className="hidden md:block"
        />
      </button>
      <button onClick={toggleFilter} className="md:hidden">
        X
      </button>
    </>
  );
};

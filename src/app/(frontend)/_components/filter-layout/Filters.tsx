"use client";

import { Category, Color, Style } from "@/app/types/shared.types";
import FilterTitle from "./FilterTitle";
import AppleFilterBtn from "./AppleFilterBtn";
import filter_icon from "@/../public/svg/filter_icon.svg";
import Image from "next/image";
import CategoryFilter from "./categories-styles/CategoryFilter";
import PriceFilter from "./PriceFilter";
import ColorPicker from "./color-picker/ColorPicker";
import SizesFilter from "./SizesFilter";
import StylesFilter from "./categories-styles/StylesFilter";
import { Size } from "@prisma/client";
import useFilter from "@/app/hooks/useFilters";
interface FiltersProps {
  filters: {
    categories: Category[];
    styles: Style[];
    colors: Color[];
    sizes: Size[];
  };
}
const Filters = ({ filters }: FiltersProps) => {
  const {
    toggleFilterIsOpen,
    selectFilter,
    getSelectedFilters,
    menuIsOpen,
    filterIsOpen,
    filterIsSelected,
  } = useFilter(filters);

  return (
    <>
      <div className="w-72 h-min p-6 border rounded-3xl flex-wrap flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <FilterTitle title="Filters" />
          <Image src={filter_icon} alt="filter icon" />
        </div>
        <hr className="w-full" />
        <CategoryFilter
          categories={filters.categories}
          toggleFilterIsOpen={toggleFilterIsOpen}
          selectFilter={selectFilter}
          filterIsSelected={filterIsSelected}
          getSelectedFilters={getSelectedFilters}
          filterIsOpen={filterIsOpen}
        />
        {/* <hr />
        <PriceFilter />
        <hr />
        <ColorPicker />
        <hr />
        <SizesFilter />
        <hr />
        <StylesFilter />
        <AppleFilterBtn /> */}
      </div>
    </>
  );
};

export default Filters;

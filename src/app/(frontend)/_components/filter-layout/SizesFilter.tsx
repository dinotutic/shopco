"use client";

import FilterTitle from "./FilterTitle";
import { Size } from "@/app/types/shared.types";
import Image from "next/image";
import toggle_filter from "@/../public/svg/toggle_filter.svg";
import { FilterType } from "@/app/hooks/useFilters";
interface SizesFilterProps {
  sizes: Size[];
  isFilterOpen: (filter: FilterType) => boolean;
  toggleIsFilterOpen: (filter: FilterType) => void;
  selectFilter: (filter: FilterType, id: number) => void;
  isFilterSelected: (option: FilterType, id: number) => boolean;
}
const SizesFilter = ({
  sizes,
  isFilterOpen,
  toggleIsFilterOpen,
  selectFilter,
  isFilterSelected,
}: SizesFilterProps) => {
  const isOpen = isFilterOpen("sizes");

  const handleToggleClick = () => {
    toggleIsFilterOpen("sizes");
  };

  const handleSizeClick = (id: number) => {
    selectFilter("sizes", id);
  };

  const handleIsSizeSelected = (id: number) => {
    return isFilterSelected("sizes", id);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <FilterTitle title="Size" />
        <Image
          src={toggle_filter}
          alt="toggle filter icon"
          onClick={handleToggleClick}
          className={`cursor-pointer ${isOpen ? "rotate-0" : "rotate-180"}`}
        />
      </div>
      {isOpen && (
        <div className="flex gap-2 flex-wrap">
          {sizes.map((size) => (
            <SizeRender
              size={size}
              key={size.id}
              onClick={handleSizeClick}
              isSizeSelected={handleIsSizeSelected}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default SizesFilter;

interface SizeRenderProps {
  size: Size;
  onClick: (id: number) => void;
  isSizeSelected: (id: number) => boolean;
}
const SizeRender = ({ size, onClick, isSizeSelected }: SizeRenderProps) => {
  return (
    <>
      <button
        className={`px-5 py-2 border rounded-full ${
          isSizeSelected(size.id)
            ? "bg-black text-white"
            : "bg-gray-200 text-gray-600"
        }`}
        onClick={() => onClick(size.id)}
      >
        {size.name}
      </button>
    </>
  );
};

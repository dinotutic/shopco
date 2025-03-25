"use client";
import RenderColors from "./RenderColors";
import FilterTitle from "../FilterTitle";
import { Color } from "@/app/types/shared.types";
import { useState } from "react";
import Image from "next/image";
import toggle_filter from "@/../public/svg/toggle_filter.svg";
import { FilterType } from "@/app/hooks/useFilters";
interface ColorPickerProps {
  availableColors: Color[];
  isFilterOpen: (filter: FilterType) => boolean;
  toggleIsFilterOpen: (filter: FilterType) => void;
  selectColor: (filter: FilterType, id: number) => void;
  isColorSelected: (option: FilterType, id: number) => boolean;
}
const ColorPicker = ({
  availableColors,
  isFilterOpen,
  toggleIsFilterOpen,
  selectColor,
  isColorSelected,
}: ColorPickerProps) => {
  const isOpen = isFilterOpen("colors");

  const handleToggleClick = () => {
    toggleIsFilterOpen("colors");
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <FilterTitle title="Color" />
        <Image
          src={toggle_filter}
          alt="toggle filter icon"
          onClick={handleToggleClick}
          className={`cursor-pointer ${isOpen ? "rotate-0" : "rotate-180"}`}
        />
      </div>
      {isOpen && (
        <RenderColors
          availableColors={availableColors}
          selectColor={selectColor}
          isColorSelected={isColorSelected}
        />
      )}
    </div>
  );
};

export default ColorPicker;

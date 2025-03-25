"use client";

import { Style } from "@/app/types/shared.types";
import CategoriesAndStyles from "./CategoriesAndStyles";
import { FilterType } from "@/app/hooks/useFilters";

interface StylesFilterProps {
  styles: Style[];
  isFilterOpen: (filter: FilterType) => boolean;
  toggleIsFilterOpen: (filter: FilterType) => void;
  selectFilter: (filter: FilterType, id: number) => void;
  isFilterSelected: (option: FilterType, id: number) => boolean;
}
const StylesFilter = ({
  styles,
  isFilterOpen,
  toggleIsFilterOpen,
  selectFilter,
  isFilterSelected,
}: StylesFilterProps) => {
  const handleSelect = (style: Style) => {
    selectFilter("styles", style.id);
  };

  const handleToggleClick = () => {
    toggleIsFilterOpen("styles");
  };

  return (
    <CategoriesAndStyles
      title="Style"
      filterType="styles"
      options={styles}
      handleSelect={handleSelect}
      isOpen={isFilterOpen("styles")}
      isSelected={isFilterSelected}
      handleToggleClick={handleToggleClick}
    />
  );
};

export default StylesFilter;

"use client";
import { useState } from "react";

import { Category, Color, Size, Style } from "../types/shared.types";

export type FilterType = "categories" | "styles" | "colors" | "sizes";

interface FiltersProps {
  categories: Category[];
  styles: Style[];
  colors: Color[];
  sizes: Size[];
}

export type FilterOption = {
  id: number;
  name: string;
  isSelected: boolean;
};

type Filter = {
  isOpen: boolean;
  options: FilterOption[];
};

const useFilter = (filters: FiltersProps) => {
  const initializeFilter = (filter: { id: number; name: string }[]) => {
    const filterProperties = filter.map((element) => ({
      ...element,
      isSelected: false,
    }));
    return { isOpen: true, options: filterProperties };
  };

  const [filterState, setFilterState] = useState({
    categories: initializeFilter(filters.categories),
    styles: initializeFilter(filters.styles),
    colors: initializeFilter(filters.colors),
    sizes: initializeFilter(filters.sizes),
    price: { isOpen: true, options: { min: 0, max: 1000 } },
  });
  const { categories, styles, colors, sizes } = filterState;

  const toggleIsFilterOpen = (filterType: FilterType) => {
    const toggleFilter = (filterType: FilterType) => {
      setFilterState((prev) => ({
        ...prev,
        [filterType]: { ...prev[filterType], isOpen: !prev[filterType].isOpen },
      }));
    };
    switch (filterType) {
      case "categories":
        toggleFilter("categories");
        break;
      case "styles":
        toggleFilter("styles");
        break;
      case "colors":
        toggleFilter("colors");
        break;
      case "sizes":
        toggleFilter("sizes");
        break;
      default:
        break;
    }
  };

  const isFilterOpen = (filterType: FilterType): boolean => {
    switch (filterType) {
      case "categories":
        return categories.isOpen;
      case "styles":
        return styles.isOpen;
      case "colors":
        return colors.isOpen;
      case "sizes":
        return sizes.isOpen;
      default:
        return false;
    }
  };

  const selectFilter = (filterType: FilterType, id: number) => {
    const updateOptions = (options: FilterOption[]) =>
      options.map((option) =>
        option.id === id
          ? { ...option, isSelected: !option.isSelected }
          : option
      );

    const updateState = (filterType: FilterType) => {
      setFilterState((prev) => ({
        ...prev,
        [filterType]: {
          ...prev[filterType],
          options: updateOptions(prev[filterType].options),
        },
      }));
    };
    switch (filterType) {
      case "categories":
        updateState("categories");
        break;
      case "styles":
        updateState("styles");
        break;
      case "colors":
        updateState("colors");
        break;
      case "sizes":
        updateState("sizes");
        break;
      default:
        break;
    }
  };

  const isFilterSelected = (option: FilterType, id: number): boolean => {
    const findOption = (filter: Filter) => {
      return (
        filter.options.find((option) => option.id === id)?.isSelected ?? false
      );
    };

    switch (option) {
      case "categories":
        return findOption(categories);
      case "styles":
        return findOption(styles);
      case "colors":
        return findOption(colors);
      case "sizes":
        return findOption(sizes);
      default:
        return false;
    }
  };

  const getSelectedFilters = () => {
    const getSelectedFilter = (filter: Filter) => {
      return filter.options.filter((element) => element.isSelected);
    };
    const selectedCategories = getSelectedFilter(categories);
    const selectedStyles = getSelectedFilter(styles);
    const selectedColors = getSelectedFilter(colors);
    const selectedSizes = getSelectedFilter(sizes);

    return {
      selectedCategories,
      selectedStyles,
      selectedColors,
      selectedSizes,
    };
  };

  const menuToggle = () => {
    setFilterState((prev) => ({
      ...prev,
      categories: { ...prev.categories, isOpen: !prev.categories.isOpen },
      styles: { ...prev.styles, isOpen: !prev.styles.isOpen },
      colors: { ...prev.colors, isOpen: !prev.colors.isOpen },
      sizes: { ...prev.sizes, isOpen: !prev.sizes.isOpen },
    }));
  };

  return {
    toggleIsFilterOpen,
    isFilterOpen,
    selectFilter,
    isFilterSelected,
    getSelectedFilters,
    menuToggle,
  };
};

export default useFilter;

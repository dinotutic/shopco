"use client";
import { useState } from "react";
import { Category, Color, Size, Style } from "../types/shared.types";

interface FiltersProps {
  categories: Category[];
  styles: Style[];
  colors: Color[];
  sizes: Size[];
}

const useFilter = (filters: FiltersProps) => {
  const initializeFilter = (filter: any) => {
    const filterProperties = filter.map((element: any) => ({
      ...element,
      isSelected: false,
    }));
    return { isOpen: true, options: filterProperties };
  };

  const [categories, setCategories] = useState(
    initializeFilter(filters.categories)
  );
  const [styles, setStyles] = useState(initializeFilter(filters.styles));
  const [colors, setColors] = useState(initializeFilter(filters.colors));
  const [sizes, setSizes] = useState(initializeFilter(filters.sizes));

  const toggleFilterIsOpen = (filterType: string) => {
    switch (filterType) {
      case "categories":
        setCategories((prev) => ({ ...prev, isOpen: !prev.isOpen }));
        break;
      case "styles":
        setStyles((prev) => ({ ...prev, isOpen: !prev.isOpen }));
        break;
      case "colors":
        setColors((prev) => ({ ...prev, isOpen: !prev.isOpen }));
        break;
      case "sizes":
        setSizes((prev) => ({ ...prev, isOpen: !prev.isOpen }));
        break;
      default:
        break;
    }
  };

  const selectFilter = (filterType: string, id: number) => {
    const updateOptions = (options: any[]) =>
      options.map((option) =>
        option.id === id
          ? { ...option, isSelected: !option.isSelected }
          : option
      );

    switch (filterType) {
      case "categories":
        setCategories((prev) => ({
          ...prev,
          options: updateOptions(prev.options),
        }));
        break;
      case "styles":
        setStyles((prev) => ({
          ...prev,
          options: updateOptions(prev.options),
        }));
        break;
      case "colors":
        setColors((prev) => ({
          ...prev,
          options: updateOptions(prev.options),
        }));
        break;
      case "sizes":
        setSizes((prev) => ({ ...prev, options: updateOptions(prev.options) }));
        break;
      default:
        break;
    }
  };

  const filterIsSelected = (
    option: "categories" | "styles" | "colors" | "sizes",
    id: number
  ): boolean => {
    switch (option) {
      case "categories":
        return categories.options.find(
          (category: Category) => category.id === id
        )?.isSelected;
      case "styles":
        return styles.options.find((style: Style) => style.id === id)
          ?.isSelected;
      case "colors":
        return colors.options.find((color: Color) => color.id === id)
          ?.isSelected;
      case "sizes":
        return sizes.options.find((size: Size) => size.id === id)?.isSelected;
      default:
        return false;
    }
  };

  const getSelectedFilters = () => {
    const selectedCategories = categories.options.filter(
      (option: { isSelected: boolean }) => option.isSelected
    );
    const selectedStyles = styles.options.filter(
      (option: { isSelected: boolean }) => option.isSelected
    );
    const selectedColors = colors.options.filter(
      (option: { isSelected: boolean }) => option.isSelected
    );
    const selectedSizes = sizes.options.filter(
      (option: { isSelected: boolean }) => option.isSelected
    );
    return {
      selectedCategories,
      selectedStyles,
      selectedColors,
      selectedSizes,
    };
  };

  const menuIsOpen = () => {
    setCategories((prev) => ({ ...prev, isOpen: !prev.isOpen }));
    setStyles((prev) => ({ ...prev, isOpen: !prev.isOpen }));
    setColors((prev) => ({ ...prev, isOpen: !prev.isOpen }));
    setSizes((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const filterIsOpen = (filterType: string) => {
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

  return {
    toggleFilterIsOpen,
    selectFilter,
    getSelectedFilters,
    menuIsOpen,
    filterIsOpen,
    filterIsSelected,
  };
};

export default useFilter;

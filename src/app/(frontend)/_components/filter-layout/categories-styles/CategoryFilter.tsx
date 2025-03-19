"use client";

import { Category } from "@/app/types/shared.types";
import CategoriesAndStyles from "./CategoriesAndStyles";
import useCategoriesFilter from "../../../../hooks/useCategoriesFilter";

interface CategoryFilterProps {
  categories: Category[];
}
const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  const { handleCategoryClick, isCategorySelected } = useCategoriesFilter();
  return (
    <CategoriesAndStyles
      title="Category"
      options={categories}
      handleOptionToggle={handleCategoryClick}
      isSelected={isCategorySelected}
    />
  );
};
export default CategoryFilter;

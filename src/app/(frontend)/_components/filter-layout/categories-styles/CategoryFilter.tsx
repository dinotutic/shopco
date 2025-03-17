"use client";

import { Category } from "@/app/types/shared.types";
import { getCategories } from "@/db/productQueries";
import { useEffect, useState } from "react";
import CategoriesAndStyles from "./CategoriesAndStyles";
import useCategoriesFilter from "../../../hooks/useCategoriesFilter";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { handleCategoryClick, isCategorySelected } = useCategoriesFilter();
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);
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

import { Category } from "@/app/types/shared.types";
import { useState } from "react";

const useCategoriesFilter = () => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const handleCategoryClick = (category: Category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.some((selected) => selected.id === category.id)
        ? prevSelected.filter((selected) => selected.id !== category.id)
        : [...prevSelected, category]
    );
  };
  const isCategorySelected = (category: Category) => {
    return selectedCategories.some((selected) => selected.id === category.id);
  };
  return { handleCategoryClick, isCategorySelected };
};

export default useCategoriesFilter;

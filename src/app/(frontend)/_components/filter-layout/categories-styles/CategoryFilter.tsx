import { Category } from "@/app/types/shared.types";
import CategoriesAndStyles from "./CategoriesAndStyles";

interface CategoryFilterProps {
  categories: Category[];
  toggleFilterIsOpen: (filter: string) => void;
  selectFilter: (filter: string, id: number) => void;
  getSelectedFilters: (filter: string) => {
    selectedCategories: { isSelected: boolean }[];
    selectedStyles: { isSelected: boolean }[];
    selectedColors: { isSelected: boolean }[];
    selectedSizes: { isSelected: boolean }[];
  };
  filterIsOpen: (filter: string) => boolean;
  filterIsSelected: (
    option: "categories" | "styles" | "colors" | "sizes",
    id: number
  ) => boolean;
}
const CategoryFilter = ({
  categories,
  toggleFilterIsOpen,
  selectFilter,
  getSelectedFilters,
  filterIsOpen,
  filterIsSelected,
}: CategoryFilterProps) => {
  const handleCategoryClick = (category: Category) => {
    selectFilter("categories", category.id);
  };

  const handleToggleClick = () => {
    toggleFilterIsOpen("categories");
  };

  return (
    <div>
      <CategoriesAndStyles
        title="Category"
        filterType="categories"
        options={categories}
        handleOptionToggle={handleCategoryClick}
        isOpen={filterIsOpen("categories")}
        isSelected={filterIsSelected}
        handleToggleClick={handleToggleClick}
      />
    </div>
  );
};
export default CategoryFilter;

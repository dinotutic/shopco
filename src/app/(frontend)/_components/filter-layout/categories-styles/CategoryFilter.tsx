import { Category } from "@/app/types/shared.types";
import CategoriesAndStyles from "./CategoriesAndStyles";
import { FilterType } from "@/app/hooks/useFilters";

interface CategoryFilterProps {
  categories: Category[];
  isFilterOpen: (filter: FilterType) => boolean;
  toggleIsFilterOpen: (filter: FilterType) => void;
  selectFilter: (filter: FilterType, id: number) => void;
  isFilterSelected: (option: FilterType, id: number) => boolean;
}
const CategoryFilter = ({
  categories,
  isFilterOpen,
  toggleIsFilterOpen,
  selectFilter,
  isFilterSelected,
}: CategoryFilterProps) => {
  const handleSelect = (category: Category) => {
    selectFilter("categories", category.id);
  };

  const handleToggleClick = () => {
    toggleIsFilterOpen("categories");
  };

  return (
    <div>
      <CategoriesAndStyles
        title="Category"
        filterType="categories"
        options={categories}
        handleSelect={handleSelect}
        isOpen={isFilterOpen("categories")}
        isSelected={isFilterSelected}
        handleToggleClick={handleToggleClick}
      />
    </div>
  );
};
export default CategoryFilter;

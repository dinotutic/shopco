import { Category } from "@/app/types/shared.types";
import CategoriesAndStyles from "./CategoriesAndStyles";
import useCategoriesFilter from "../../../../hooks/useCategoriesFilter";
import { getCategories } from "@/db/productQueries";

interface CategoryFilterProps {
  categories: Category[];
}
const CategoryFilter = async ({ categories }: CategoryFilterProps) => {
  return (
    <div></div>
    // <CategoriesAndStyles
    //   title="Category"
    //   options={categories}
    //   handleOptionToggle={handleCategoryClick}
    //   isSelected={isCategorySelected}
    //   isOpen={isOpen}
    //   handleToggleClick={handleToggleClick}
    // />
  );
};
export default CategoryFilter;
// "use client";

// import { Category } from "@/app/types/shared.types";
// import CategoriesAndStyles from "./CategoriesAndStyles";
// import useCategoriesFilter from "../../../../hooks/useCategoriesFilter";

// interface CategoryFilterProps {
//   categories: Category[];
// }
// const CategoryFilter = ({ categories }: CategoryFilterProps) => {
//   return (
//     <CategoriesAndStyles
//       title="Category"
//       options={categories}
//       handleOptionToggle={handleCategoryClick}
//       isSelected={isCategorySelected}
//     />
//   );
// };
// export default CategoryFilter;

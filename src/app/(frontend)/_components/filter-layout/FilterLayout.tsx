import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";

const FilterLayout = () => {
  return (
    <div className="border w-2/5">
      <CategoryFilter />
      <PriceFilter />
    </div>
  );
};

export default FilterLayout;

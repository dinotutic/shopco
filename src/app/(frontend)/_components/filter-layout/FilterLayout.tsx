import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";

const FilterLayout = () => {
  return (
    <div className="border">
      <CategoryFilter />
      <PriceFilter />
    </div>
  );
};

export default FilterLayout;

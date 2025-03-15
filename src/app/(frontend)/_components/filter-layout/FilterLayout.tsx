import ColorPicker from "../color-picker/ColorPicker";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";

const FilterLayout = () => {
  return (
    <div className="border w-2/5">
      <CategoryFilter />
      <PriceFilter />
      <ColorPicker />
    </div>
  );
};

export default FilterLayout;

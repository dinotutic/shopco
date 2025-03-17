import CategoryFilter from "./categories-styles/CategoryFilter";
import StylesFilter from "./categories-styles/StylesFilter";
import ColorPicker from "./color-picker/ColorPicker";
import PriceFilter from "./PriceFilter";
import SizesFilter from "./SizesFilter";

const FilterLayout = () => {
  return (
    <div className="border w-2/5">
      <CategoryFilter />
      <PriceFilter />
      <ColorPicker />
      <SizesFilter />
      <StylesFilter />
    </div>
  );
};

export default FilterLayout;

import {
  getCategories,
  getColors,
  getSizes,
  getStyles,
} from "@/db/productQueries";
import CategoryFilter from "./categories-styles/CategoryFilter";
import StylesFilter from "./categories-styles/StylesFilter";
import ColorPicker from "./color-picker/ColorPicker";
import PriceFilter from "./PriceFilter";
import SizesFilter from "./SizesFilter";
import filter_icon from "@/../public/svg/filter_icon.svg";
import Image from "next/image";
import FilterTitle from "./FilterTitle";
import AppleFilterBtn from "./AppleFilterBtn";

const FilterLayout = async () => {
  const categories = await getCategories();
  const styles = await getStyles();
  const sizes = await getSizes();
  const availableColors = await getColors();
  return (
    <div className="max-w-72 h-min p-6 border rounded-3xl flex-wrap flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <FilterTitle title="Filters" />
        <Image src={filter_icon} alt="filter icon" />
      </div>
      <hr className="w-full" />
      <CategoryFilter categories={categories} />
      <hr className="w-full" />
      <PriceFilter />
      <hr className="w-full" />
      <ColorPicker availableColors={availableColors} />
      <hr className="w-full" />
      <SizesFilter sizes={sizes} />
      <hr className="w-full" />
      <StylesFilter styles={styles} />
      <AppleFilterBtn />
    </div>
  );
};

export default FilterLayout;

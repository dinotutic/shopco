import { getColors } from "@/db/productQueries";
import FilterTitle from "../filter-layout/FilterTitle";
import RenderColors from "./RenderColors";

const ColorPicker = async () => {
  const availableColors = await getColors();
  return (
    <div>
      <FilterTitle title="Color" />
      <RenderColors availableColors={availableColors} />
    </div>
  );
};

export default ColorPicker;

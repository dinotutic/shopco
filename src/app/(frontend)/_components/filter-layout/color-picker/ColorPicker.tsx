import { getColors } from "@/db/productQueries";
import RenderColors from "./RenderColors";
import FilterTitle from "../FilterTitle";

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

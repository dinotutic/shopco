import RenderColors from "./RenderColors";
import FilterTitle from "../FilterTitle";
import { Color } from "@/app/types/shared.types";

interface ColorPickerProps {
  availableColors: Color[];
}
const ColorPicker = ({ availableColors }: ColorPickerProps) => {
  return (
    <div>
      <FilterTitle title="Color" />
      <RenderColors availableColors={availableColors} />
    </div>
  );
};

export default ColorPicker;

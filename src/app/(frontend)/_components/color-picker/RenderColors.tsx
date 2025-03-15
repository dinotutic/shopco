"use client";

import { Color } from "@/app/types/shared.types";
import Image from "next/image";
import checkmark from "@/../public/svg/color_checkmark.svg";
import useColorPicker from "../../hooks/useColorPicker";

interface RenderColorsProps {
  availableColors: Color[];
}

const RenderColors = ({ availableColors }: RenderColorsProps) => {
  const { selectedColor, handleColorClick, isColorSelected } = useColorPicker();
  console.log(selectedColor);
  return (
    <div className="flex flex-wrap gap-1">
      {availableColors.map((color) => (
        <RenderColor
          key={color.id}
          color={color}
          onClick={handleColorClick}
          isColorSelected={isColorSelected}
        />
      ))}
    </div>
  );
};

export default RenderColors;

interface RenderColorProps {
  color: Color;
  onClick: (color: Color) => void;
  isColorSelected: (color: Color) => boolean;
}
const RenderColor = ({ color, onClick, isColorSelected }: RenderColorProps) => {
  const colorStyle: React.CSSProperties = {
    background:
      color.name === "colorful"
        ? "linear-gradient(90deg, red, orange, yellow, green, blue, violet)"
        : color.name,
    // opacity: isAvailable || isSelected ? 1 : 0.5,
    cursor: "pointer",
    // pointerEvents: isSelected ? "none" : "auto",
  };
  return (
    <div
      className={`w-8 h-8 bg- rounded-full border border-gray-300 flex items-center justify-center`}
      style={colorStyle}
      onClick={() => onClick(color)}
    >
      <div className={`${isColorSelected(color) ? "block" : "hidden"}`}>
        <Image src={checkmark} alt="Checkmark" className="checkmark " />
      </div>
    </div>
  );
};

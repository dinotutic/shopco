"use client";

import { Color } from "@/app/types/shared.types";
import Image from "next/image";
import checkmark from "@/../public/svg/color_checkmark.svg";
import { FilterType } from "@/app/hooks/useFilters";

interface RenderColorsProps {
  availableColors: Color[];
  selectColor: (filter: FilterType, id: number) => void;
  isColorSelected: (option: FilterType, id: number) => boolean;
}

const RenderColors = ({
  availableColors,
  selectColor,
  isColorSelected,
}: RenderColorsProps) => {
  const handleColorClick = (id: number) => {
    selectColor("colors", id);
  };
  const handleIsColorSlected = (id: number) => {
    return isColorSelected("colors", id);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {availableColors.map((color) => (
        <RenderColor
          key={color.id}
          color={color}
          onClick={handleColorClick}
          isColorSelected={handleIsColorSlected}
        />
      ))}
    </div>
  );
};

export default RenderColors;

interface RenderColorProps {
  color: Color;
  onClick: (id: number) => void;
  isColorSelected: (id: number) => boolean;
}
const RenderColor = ({ color, onClick, isColorSelected }: RenderColorProps) => {
  const colorStyle: React.CSSProperties = {
    background:
      color.name === "colorful"
        ? "linear-gradient(90deg, red, orange, yellow, green, blue, violet)"
        : color.name,
    cursor: "pointer",
  };
  return (
    <div
      className={`w-8 h-8 bg- rounded-full border border-gray-300 flex items-center justify-center`}
      style={colorStyle}
      onClick={() => onClick(color.id)}
    >
      <div className={`${isColorSelected(color.id) ? "block" : "hidden"}`}>
        <Image src={checkmark} alt="Checkmark" className="checkmark " />
      </div>
    </div>
  );
};
// "use client";

// import { Color } from "@/app/types/shared.types";
// import Image from "next/image";
// import checkmark from "@/../public/svg/color_checkmark.svg";
// import useColorPicker from "@/app/hooks/useColorPicker";
// import { FilterType } from "@/app/hooks/useFilters";

// interface RenderColorsProps {
//   availableColors: Color[];
//   selectColor: (filter: FilterType, id: number) => void;
//   isColorSelected: (option: FilterType, id: number) => boolean;
// }

// const RenderColors = ({
//   availableColors,
//   selectColor,
//   isColorSelected,
// }: RenderColorsProps) => {
//   const { selectedColor, handleColorClick, isColorSelected } = useColorPicker();

//   return (
//     <div className="flex flex-wrap gap-2">
//       {availableColors.map((color) => (
//         <RenderColor
//           key={color.id}
//           color={color}
//           onClick={handleColorClick}
//           isColorSelected={isColorSelected}
//         />
//       ))}
//     </div>
//   );
// };

// export default RenderColors;

// interface RenderColorProps {
//   color: Color;
//   onClick: (color: Color) => void;
//   isColorSelected: (color: Color) => boolean;
// }
// const RenderColor = ({ color, onClick, isColorSelected }: RenderColorProps) => {
//   const colorStyle: React.CSSProperties = {
//     background:
//       color.name === "colorful"
//         ? "linear-gradient(90deg, red, orange, yellow, green, blue, violet)"
//         : color.name,
//     cursor: "pointer",
//   };
//   return (
//     <div
//       className={`w-8 h-8 bg- rounded-full border border-gray-300 flex items-center justify-center`}
//       style={colorStyle}
//       onClick={() => onClick(color)}
//     >
//       <div className={`${isColorSelected(color) ? "block" : "hidden"}`}>
//         <Image src={checkmark} alt="Checkmark" className="checkmark " />
//       </div>
//     </div>
//   );
// };

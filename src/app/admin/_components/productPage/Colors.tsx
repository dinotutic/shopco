import { useRouter } from "next/navigation";
import { Product, Color } from "../shared.types";

interface ColorsProps {
  isEditing: boolean;
  product?: Product;
  colors: Color[];
  availableColors: Color[];
  setAvailableColors: React.Dispatch<React.SetStateAction<Color[]>>;
  selectedColor: Color;
  setSelectedColor?: React.Dispatch<React.SetStateAction<Color>>;
  mode: "create" | "edit";
}

const Colors: React.FC<ColorsProps> = ({
  isEditing,
  product,
  colors,
  availableColors,
  setAvailableColors,
  selectedColor,
  setSelectedColor,

  mode,
}) => {
  const router = useRouter();

  const handleColorClick = (color: Color) => {
    if (mode === "edit") {
      setAvailableColors((prev) =>
        prev.some((c) => c.id === color.id)
          ? prev.filter((c) => c.id !== color.id)
          : [...prev, color]
      );
    } else if (mode === "create" && setSelectedColor) {
      setSelectedColor(color);
    }
  };

  const handleColorLink = (color: Color) => {
    if (availableColors.some((c) => c.id === color.id)) {
      if (product) {
        return router.push(`/admin/products/${product.id}/${color.id}`);
      }
    }
  };
  console.log("selectedColor", selectedColor);
  return (
    <div className="mb-4 flex flex-col">
      <label className="text-sm font-medium text-gray-700">
        Selected Color
      </label>
      <div className="inline-block">
        <ColorItem
          key={selectedColor.id}
          color={selectedColor}
          isEditing={isEditing}
          // isSelected={true}
          handleColorClick={handleColorClick}
          handleColorLink={handleColorLink}
          availableColors={availableColors}
        />
      </div>
      <label className="block text-sm font-medium text-gray-700">Colors</label>
      <div className="flex gap-1">
        {colors.map((color) => (
          <ColorItem
            key={color.id}
            color={color}
            isEditing={isEditing}
            selectedColor={selectedColor}
            // isSelected={availableColors.some((c) => c.id === color.id)}
            handleColorClick={handleColorClick}
            handleColorLink={handleColorLink}
            availableColors={availableColors}
          />
        ))}
      </div>
    </div>
  );
};

interface ColorItemProps {
  color: Color;
  isEditing: boolean;
  selectedColor?: Color;
  // isSelected: boolean;
  handleColorClick: (color: Color) => void;
  handleColorLink: (color: Color) => void;
  availableColors: Color[];
}

const ColorItem: React.FC<ColorItemProps> = ({
  color,
  isEditing,
  selectedColor,
  // isSelected,
  handleColorClick,
  handleColorLink,
  availableColors,
}) => {
  const isAvailable = availableColors.some((c) => c.id === color.id);
  const isSelected = selectedColor?.id === color.id;

  const colorStyle = {
    background:
      color.name === "Colorful"
        ? "linear-gradient(90deg, red, orange, yellow, green, blue, violet)"
        : color.name,
    opacity: isAvailable ? 1 : 0.5,
    cursor: isEditing || isAvailable ? "pointer" : "default",
    pointerEvents: isSelected ? "none" : "auto",
  };

  return (
    <div
      className={`border-2 border-black-500 rounded-full inline-block ${
        isAvailable ? "border-black" : "border-transparent"
      }`}
    >
      <div
        className="w-8 h-8 rounded-full cursor-pointer border-2"
        style={colorStyle}
        onClick={
          isEditing
            ? () => handleColorClick(color)
            : () => handleColorLink(color)
        }
      ></div>
    </div>
  );
};

export default Colors;
// import { useRouter } from "next/navigation";
// import { Product, Color } from "../shared.types";

// interface ColorsProps {
//   isEditing: boolean;
//   product?: Product;
//   colors: Color[];
//   availableColors: Color[];
//   setAvailableColors: React.Dispatch<React.SetStateAction<Color[]>>;
//   selectedColor: Color;
//   setSelectedColor?: React.Dispatch<React.SetStateAction<Color>>;
//   mode: "create" | "edit";
// }

// const Colors: React.FC<ColorsProps> = ({
//   isEditing,
//   product,
//   colors,
//   availableColors,
//   setAvailableColors,
//   selectedColor,
//   setSelectedColor,

//   mode,
// }) => {
//   const router = useRouter();

//   const handleColorClick = (color: Color) => {
//     if (mode === "edit") {
//       setAvailableColors((prev) =>
//         prev.some((c) => c.id === color.id)
//           ? prev.filter((c) => c.id !== color.id)
//           : [...prev, color]
//       );
//     } else if (mode === "create" && setSelectedColor) {
//       setSelectedColor(color);
//     }
//   };

//   const handleColorLink = (color: Color) => {
//     if (availableColors.some((c) => c.id === color.id)) {
//       if (product) {
//         return router.push(`/admin/products/${product.id}/${color.id}`);
//       }
//     }
//   };
//   console.log("selectedColor", selectedColor);
//   return (
//     <div className="mb-4 flex flex-col">
//       <label className="text-sm font-medium text-gray-700">
//         Selected Color
//       </label>
//       <div className="inline-block">
//         <ColorItem
//           key={selectedColor.id}
//           color={selectedColor}
//           isEditing={isEditing}
//           isSelected={true}
//           handleColorClick={handleColorClick}
//           handleColorLink={handleColorLink}
//           availableColors={availableColors}
//         />
//       </div>
//       <label className="block text-sm font-medium text-gray-700">Colors</label>
//       <div className="flex gap-1">
//         {colors.map((color) => (
//           <ColorItem
//             key={color.id}
//             color={color}
//             isEditing={isEditing}
//             isSelected={availableColors.some((c) => c.id === color.id)}
//             handleColorClick={handleColorClick}
//             handleColorLink={handleColorLink}
//             availableColors={availableColors}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// interface ColorItemProps {
//   color: Color;
//   isEditing: boolean;
//   isSelected: boolean;
//   handleColorClick: (color: Color) => void;
//   handleColorLink: (color: Color) => void;
//   availableColors: Color[];
// }

// const ColorItem: React.FC<ColorItemProps> = ({
//   color,
//   isEditing,
//   isSelected,
//   handleColorClick,
//   handleColorLink,
//   availableColors,
// }) => {
//   const isAvailable = availableColors.some((c) => c.id === color.id);

//   const colorStyle = {
//     background:
//       color.name === "Colorful"
//         ? "linear-gradient(90deg, red, orange, yellow, green, blue, violet)"
//         : color.name,
//     opacity: isSelected ? 1 : 0.5,
//     cursor: isEditing || isAvailable ? "pointer" : "default",
//   };

//   return (
//     <div
//       className={`border-2 border-black-500 rounded-full inline-block ${
//         isSelected ? "border-black" : "border-transparent"
//       }`}
//     >
//       <div
//         className="w-8 h-8 rounded-full cursor-pointer border-2"
//         style={colorStyle}
//         onClick={
//           isEditing
//             ? () => handleColorClick(color)
//             : () => handleColorLink(color)
//         }
//       ></div>
//     </div>
//   );
// };

// export default Colors;

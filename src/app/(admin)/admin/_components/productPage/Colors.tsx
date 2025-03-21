import { useRouter } from "next/navigation";
import { Product, Color, FormOptions } from "../../../../types/shared.types";

// Edit mode:
// Clicking on a color that is not available will add it to availableColors which will later be used to create a new stock object with that color
// Clicking a color that is available will remove it from availableColors which will later delete a stock object with that color

// Create mode:
// Clicking on a color will set it as the selected color. To add additional colors to product, new colors can be selected in edit mode after the product has been created
interface ColorsProps {
  product?: Product;
  allColors: Color[];
  setProductField: (field: string, value: any) => void;
  isEditing: boolean;
  availableColors: Color[];
  selectedColor: Color;
  mode: "create" | "edit";
}
const Colors: React.FC<ColorsProps> = ({
  product,
  allColors,
  setProductField,
  isEditing,
  availableColors,
  selectedColor,
  mode,
}) => {
  const router = useRouter();

  const handleColorClick = (color: Color) => {
    if (mode === "edit") {
      setProductField(
        "availableColors",
        availableColors.some((c) => c.id === color.id)
          ? availableColors.filter((c) => c.id !== color.id)
          : [...availableColors, color]
      );
      console.log(availableColors);
    } else if (mode === "create") {
      setProductField("selectedColor", color);
    }
  };

  const handleColorLink = (color: Color) => {
    if (availableColors.some((c) => c.id === color.id)) {
      if (product) {
        return router.push(`/admin/products/${product.id}/${color.id}`);
      }
    }
  };

  return (
    <div className="mb-4 flex flex-col">
      <label className="text-sm font-medium text-gray-700">
        Selected Color
      </label>
      <div className="inline-block">
        <ColorItem
          color={selectedColor}
          isEditing={isEditing}
          selectedColor={selectedColor}
          handleColorClick={handleColorClick}
          handleColorLink={handleColorLink}
          availableColors={availableColors}
        />
      </div>
      <label className="block text-sm font-medium text-gray-700">Colors</label>
      <div className="flex gap-1">
        {allColors.map((color) => (
          <ColorItem
            key={color.id}
            color={color}
            isEditing={isEditing}
            selectedColor={selectedColor}
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
  handleColorClick: (color: Color) => void;
  handleColorLink: (color: Color) => void;
  availableColors: Color[];
}

const ColorItem: React.FC<ColorItemProps> = ({
  color,
  isEditing,
  selectedColor,
  handleColorClick,
  handleColorLink,
  availableColors,
}) => {
  const isAvailable = availableColors.some((c) => c.id === color.id);
  const isSelected = selectedColor?.id === color.id;

  const colorStyle: React.CSSProperties = {
    background:
      color.name === "colorful"
        ? "linear-gradient(90deg, red, orange, yellow, green, blue, violet)"
        : color.name,
    opacity: isAvailable || isSelected ? 1 : 0.5,
    cursor: isEditing || isAvailable ? "pointer" : "default",
    pointerEvents: isSelected ? "none" : "auto",
  };

  return (
    <div
      className={`border-2 border-black-500 rounded-full inline-block ${
        isAvailable || isSelected ? "border-black" : "border-transparent"
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

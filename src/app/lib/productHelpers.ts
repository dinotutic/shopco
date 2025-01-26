import { Color } from "@prisma/client";
import { Stock } from "../admin/_components/shared.types";

const createDefaultStock = (selectedColor: Color, stock?: Stock[]) => {
  const defaultStock: Stock[] = [];
  const sizes = ["XS", "S", "M", "L", "XL"];
  sizes.forEach((size, index) => {
    const existingStock = stock?.find((item) => item.size === size);
    defaultStock.push({
      id: index,
      color: { id: selectedColor.id, name: selectedColor.name },
      productId: -10,
      size,
      quantity: existingStock ? existingStock.quantity : 0,
    });
  });
  return defaultStock;
};

export const initializeStock = (
  mode: "create" | "edit",
  stock: Stock[],
  initialStock: Stock[] | undefined,
  selectedColor: Color
): Stock[] => {
  if (mode === "create") {
    return createDefaultStock(selectedColor, stock);
  } else {
    return (initialStock || []).filter(
      (size) => size.color.id === selectedColor.id
    );
  }
};

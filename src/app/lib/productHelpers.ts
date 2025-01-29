import { Color } from "@prisma/client";
import { Image, Stock } from "../admin/_components/shared.types";

// const createDefaultStock = (selectedColor: Color, stock?: Stock[]) => {
//   const defaultStock: Stock[] = [];
//   const sizes = ["XS", "S", "M", "L", "XL"];
//   sizes.forEach((size, index) => {
//     const existingStock = stock?.find((item) => item.size === size);
//     defaultStock.push({
//       id: index,
//       color: { id: selectedColor.id, name: selectedColor.name },
//       productId: -10,
//       size,
//       quantity: existingStock ? existingStock.quantity : 0,
//     });
//   });
//   return defaultStock;
// };

// export const initializeStock = (
//   mode: "create" | "edit",
//   stock: Stock[],
//   initialStock: Stock[] | undefined,
//   selectedColor: Color
// ): Stock[] => {
//   if (mode === "create") {
//     return createDefaultStock(selectedColor, stock);
//   } else {
//     return (initialStock || []).filter(
//       (size) => size.color.id === selectedColor.id
//     );
//   }
// };

export const processImagesArray = (
  images: Image[],
  action: "upload" | "delete"
): Image[] => {
  if (action === "upload") {
    return images.filter(
      (image) =>
        !image.markedForDeletion && image.isNew && image.file instanceof File
    );
  }
  if (action === "delete") {
    return images.filter(
      (image) => image.markedForDeletion && !image.isNew && image.url
    );
  }
  return [];
};

export const createEmptyStock = (
  selectedColor: Color,
  productId: number
): Stock[] => {
  const sizes = ["XS", "S", "M", "L", "XL"];
  const emptyStock: Stock[] = sizes.map((size, index) => ({
    id: index,
    color: { id: selectedColor.id, name: selectedColor.name },
    productId,
    size,
    quantity: 0,
  }));
  return emptyStock;
};

export const removeDuplicatesInArr = (array: any[], key: any) => {
  const seen = new Set();
  return array.filter((item) => {
    const duplicate = seen.has(item[key]);
    seen.add(item[key]);
    return !duplicate;
  });
};

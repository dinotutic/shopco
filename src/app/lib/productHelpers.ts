import { Color } from "@prisma/client";
import { Image, Stock } from "../admin/_components/shared.types";

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

export const createEmptyStock = (selectedColor: Color): Stock[] => {
  const sizes = ["XS", "S", "M", "L", "XL"];
  const emptyStock: Stock[] = sizes.map((size, index) => ({
    id: index,
    color: { id: selectedColor.id, name: selectedColor.name },
    size,
    quantity: 0,
  }));
  return emptyStock;
};

export const updateStockColor = (selectedColor: Color, stock: Stock[]) => {
  return stock.map((item) => ({
    ...item,
    color: { id: selectedColor.id, name: selectedColor.name },
  }));
};

export const removeDuplicatesInArr = (array: any[], key: any) => {
  const seen = new Set();
  return array.filter((item) => {
    const duplicate = seen.has(item[key]);
    seen.add(item[key]);
    return !duplicate;
  });
};

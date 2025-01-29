import {
  addProduct,
  deleteSingleImage,
  deleteStock,
  editProduct,
} from "@/db/productQueries";
import {
  processImagesArray,
  removeDuplicatesInArr,
} from "@/app/lib/productHelpers";
import { Color, Image, Style } from "../admin/_components/shared.types";
import { Category, Gender } from "@prisma/client";

export interface ProductHandleSubmitProps {
  name: string;
  description: string;
  details: string;
  stock: {
    size: string;
    quantity: number;
    color: { name: string; id: number };
  }[];
  priceInCents: number;
  isAvailable: boolean;
  topSelling: boolean;
  newArrival: boolean;
  sale: number;
  gender: Gender;
  category: Category;
  style: Style;
  images: Image[];
}

export const handleSubmitCreate = async (
  e: { preventDefault: () => void },
  data: ProductHandleSubmitProps
) => {
  e.preventDefault();
  const imagesToUpload = processImagesArray(data.images, "upload") || [];
  data.images = imagesToUpload;

  try {
    const newProduct = await addProduct(data);
    return newProduct;
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

export const handleSubmitEdit = async (
  e: { preventDefault: () => void },
  data: ProductHandleSubmitProps,
  id: number,
  availableColors: Color[]
) => {
  e.preventDefault();

  // Define sizes
  const sizes = ["XS", "S", "M", "L", "XL"];

  // Determine colors to add
  const newColors = availableColors.filter(
    (color) => !data.stock.some((stock) => stock.color.id === color.id)
  );

  // Determine colors to be removed and remove duplicates from array
  const colorsToRemove = removeDuplicatesInArr(
    data.stock.filter(
      (stock) => !availableColors.some((color) => color.id === stock.color.id)
    ),
    "colorId"
  );
  console.log("newcolors", newColors);
  console.log("colorsToRemove", colorsToRemove);

  const newStock = newColors.flatMap((color) =>
    sizes.map((size) => ({
      size,
      quantity: 0,
      color: color,
      productId: id || 0,
    }))
  );

  data.stock = [...data.stock, ...newStock];

  const imagesToDelete = processImagesArray(data.images, "delete") || [];
  // Delete images in S3 and DB
  await Promise.all(
    imagesToDelete.map(async (image) => {
      if (image.url) {
        await deleteSingleImage(id, image.url);
      }
    })
  );

  try {
    const updatedProduct = await editProduct(id, data);
    await deleteStock(colorsToRemove);
    console.log("Product updated successfully:", updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
  }

  window.location.reload();
};

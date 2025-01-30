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
    productId?: number;
    size: string;
    quantity: number;
    color: Color;
    isNew?: boolean;
    toDelete?: boolean;
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
  availableColors: Color[],
  selectedColor: Color
) => {
  e.preventDefault();

  // Define sizes
  const sizes = ["XS", "S", "M", "L", "XL"];

  // Finds colors that are new and creates a new empty stock for those colors
  const newColors = availableColors.filter(
    (color) => !data.stock.some((stock) => stock.color.id === color.id)
  );
  const newStock = newColors.flatMap((color) =>
    sizes.map((size) => ({
      size,
      quantity: 0,
      color: color,
      productId: id || 0,
      isNew: true,
    }))
  );
  data.stock = [...data.stock, ...newStock];

  // Find colors to be removed and mark them for deletion
  data.stock.forEach((item) => {
    item.toDelete = !availableColors.some(
      (color) => color.id === item.color.id
    );
  });

  // Delete images in S3 and DB
  const imagesToDelete = processImagesArray(data.images, "delete") || [];

  await Promise.all(
    imagesToDelete.map(async (image) => {
      if (image.url) {
        await deleteSingleImage(id, image.url);
      }
    })
  );

  try {
    const updatedProduct = await editProduct(id, data, selectedColor);
    console.log("Product updated successfully:", updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
  }
  window.location.reload();
};

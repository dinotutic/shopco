import {
  addProduct,
  deleteSingleImage,
  editProduct,
} from "@/db/productQueries";
import { Gender, Category, Style } from "@prisma/client";
import { processImagesArray } from "@/app/lib/productHelpers";
import { Image } from "../admin/_components/shared.types";

export const handleSubmitCreate = async (
  e: { preventDefault: () => void },
  data: {
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
  data: {
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
  },
  id: number
) => {
  e.preventDefault();

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
    console.log("Product updated successfully:", updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
  }

  // window.location.reload();
  // }
};

import {
  addProduct,
  deleteSingleImage,
  editProduct,
} from "@/db/productQueries";
import { processImagesArray } from "@/app/lib/productHelpers";
import {
  Color,
  ProductHandleSubmitProps,
} from "../admin/_components/shared.types";

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

  // isnt working currently
  const newColors = availableColors.filter(
    (color) => !data.stock.some((stock) => stock.color.id === color.id)
  );
  const sizes = ["XS", "S", "M", "L", "XL"];
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
  console.log(data.stock);
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
};

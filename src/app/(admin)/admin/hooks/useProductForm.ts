import { useState } from "react";
import { Product, Color, FormOptions } from "../../../types/shared.types";
import { removeDuplicatesInArr } from "@/app/lib/productHelpers";

export interface UseProductFormProps {
  product?: Product;
  initialSelectedColor: Color;
  formOptions: FormOptions;
  mode: "create" | "edit";
}

export const useProductForm = ({
  product,
  formOptions,
  initialSelectedColor,
  mode,
}: UseProductFormProps) => {
  const { styles, categories, genders } = formOptions;

  // Extract available colors from product stock and trim array
  const initialAvailableColors = removeDuplicatesInArr(
    (product?.stock || []).map((item) => item.color),
    "id"
  );

  const [productState, setProductState] = useState({
    name: product?.name || "",
    description: product?.description || "",
    details: product?.details || "",
    priceInCents: product?.priceInCents || 0,
    gender: product?.gender || genders[0],
    sale: product?.sale || 0,
    newArrival: product?.newArrival || false,
    topSelling: product?.topSelling || false,
    style: product?.style || styles[0],
    category: product?.category || categories[0],
    images: product?.images || [],
    availableForSale: product?.isAvailable || false,
    availableColors: initialAvailableColors,
    stock: product?.stock || [],
    selectedColor: initialSelectedColor,
    isEditing: mode === "create" ? true : false,
    isLoading: false,
  });

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setProductField("isEditing", true);
  };

  const handleDiscard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.reload();
  };

  const setProductField = (field: string, value: any) => {
    setProductState((prevState) => {
      const newState = {
        ...prevState,
        [field]: value,
      };
      return newState;
    });
  };

  return {
    productState,
    setProductField,
    handleEdit,
    handleDiscard,
  };
};

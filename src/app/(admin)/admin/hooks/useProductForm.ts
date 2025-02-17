import { useState } from "react";
import {
  Product,
  Style,
  Color,
  Category,
  Stock,
  Image,
} from "../_components/shared.types";
import { Gender } from "@prisma/client";
import { removeDuplicatesInArr } from "@/app/lib/productHelpers";

interface UseProductFormProps {
  product?: Product;
  styles: Style[];
  categories: Category[];
  colors: Color[];
  color?: Color;
  mode: "create" | "edit";
  genders: Gender[];
}

export const useProductForm = ({
  product,
  styles,
  categories,
  colors,
  color,
  mode,
  genders,
}: UseProductFormProps) => {
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
    selectedColor: color || colors[0],
    isEditing: mode === "create" ? true : false,
    isLoading: false,
  });

  const setProductField = (field: string, value: any) => {
    setProductState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return {
    productState,
    setProductField,
  };
};

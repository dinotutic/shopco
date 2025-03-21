import { handleSubmitCreate, handleSubmitEdit } from "@/app/lib/submitHelpers";
import { Color, Size } from "../../../../types/shared.types";

interface handleSubmitProps {
  productId: number | undefined;
  selectedColor: Color;
  productState: any;
  mode: string;
  setProductField: (field: string, value: any) => void;
  sizes: Size[];
}

const handleSubmit =
  ({
    productId,
    selectedColor,
    productState,
    mode,
    setProductField,
    sizes,
  }: handleSubmitProps) =>
  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProductField("isLoading", true);

    const data = {
      name: productState.name,
      description: productState.description,
      details: productState.details,
      stock: productState.stock,
      priceInCents: productState.priceInCents,
      gender: productState.gender,
      isAvailable: productState.availableForSale,
      topSelling: productState.topSelling,
      newArrival: productState.newArrival,
      sale: productState.sale,
      category: {
        id: productState.category.id,
        name: productState.category.name,
      },
      style: { id: productState.style.id, name: productState.style.name },
      images: productState.images,
      colors: productState.availableColors,
    };
    const availableColors = productState.availableColors;

    try {
      if (mode === "edit" && productId) {
        handleSubmitEdit(
          e,
          data,
          productId,
          availableColors,
          selectedColor,
          sizes
        );
      } else if (mode === "create") {
        const newProd = await handleSubmitCreate(e, data);
        if (newProd) {
          window.location.href = `/admin/products/${newProd.id}/${newProd.stock[0].color.id}`;
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProductField("isLoading", false);
    }
  };

export default handleSubmit;

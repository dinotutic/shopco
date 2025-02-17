import PageHeader from "../../_components/PageHeader";
import ProductForm from "../../_components/productPage/ProductForm";
import { getFormOptions } from "@/db/productQueries";

export default async function AddProduct() {
  // categories, styles, colors and genders
  const formOptions = await getFormOptions();
  const placeHolderColor = formOptions.colors[0];
  return (
    <>
      <div className="flex items-center w-full">
        <PageHeader>Add Product</PageHeader>
      </div>
      <ProductForm
        formOptions={formOptions}
        mode={"create"}
        initialSelectedColor={placeHolderColor}
      />
    </>
  );
}

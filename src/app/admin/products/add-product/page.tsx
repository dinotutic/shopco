import PageHeader from "../../_components/PageHeader";
import ProductForm from "../../_components/productPage/ProductForm";
import {
  getCategories,
  getColors,
  getGenders,
  getStyles,
} from "@/db/productQueries";

export default async function AddProduct() {
  const categories = await getCategories();
  const styles = await getStyles();
  const colors = await getColors();
  const genders = await getGenders();
  return (
    <>
      <div className="flex items-center w-full">
        <PageHeader>Add Product</PageHeader>
      </div>
      <ProductForm
        categories={categories}
        styles={styles}
        colors={colors}
        mode={"create"}
        genders={genders}
      />
    </>
  );
}

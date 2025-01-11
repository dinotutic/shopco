import PageHeader from "../../_components/PageHeader";
import ProductForm from "../../_components/ProductForm";
import { getCategories, getColors, getStyles } from "@/db/productQueries";

export default async function AddProduct() {
  const categories = await getCategories();
  const styles = await getStyles();
  const colors = await getColors();
  return (
    <>
      <PageHeader>Add Product</PageHeader>
      <ProductForm categories={categories} styles={styles} colors={colors} />
    </>
  );
}

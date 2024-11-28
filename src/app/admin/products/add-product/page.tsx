import PageHeader from "../../_components/PageHeader";
import ProductForm from "../../_components/ProductForm";
import { getCategories, getStyles } from "@/db/productQueries";

export default async function AddProduct() {
  const categories = await getCategories();
  const styles = await getStyles();
  return (
    <>
      <PageHeader>Add Product</PageHeader>
      <ProductForm categories={categories} styles={styles} />
    </>
  );
}

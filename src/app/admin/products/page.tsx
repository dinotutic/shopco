import Link from "next/link";
import PageHeader from "../_components/PageHeader";
import ProductList from "../_components/productPage/ProductList";
import {
  getAllProducts,
  getCategories,
  getGenders,
  getStyles,
} from "@/db/productQueries";

export default async function AdminProductsPage() {
  const products = await getAllProducts();
  const categories = await getCategories();
  const styles = await getStyles();
  const genders = await getGenders();
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <PageHeader>Products</PageHeader>
        <button className="border rounded-2xl p-4 bg-secondaryBackground text-secondaryText mx-4 ">
          <Link href="/admin/products/add-product">Add Product</Link>
        </button>
      </div>
      <ProductList
        products={products}
        styles={styles}
        categories={categories}
        genders={genders}
      />
    </>
  );
}

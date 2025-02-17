import Link from "next/link";
import PageHeader from "../_components/PageHeader";
import ProductList from "../_components/productPage/ProductList";
import { getAllProducts, getFormOptions } from "@/db/productQueries";

export default async function AdminProductsPage() {
  const products = await getAllProducts();
  const formOptions = await getFormOptions();
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <PageHeader>Products</PageHeader>
        <Link
          className="border rounded-2xl p-4 bg-secondaryBackground text-secondaryText mx-4 "
          href="/admin/products/add-product"
        >
          Add Product
        </Link>
      </div>
      <ProductList products={products} formOptions={formOptions} />
    </>
  );
}

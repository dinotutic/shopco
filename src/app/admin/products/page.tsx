import Link from "next/link";
import PageHeader from "../_components/PageHeader";
import ProductList from "../_components/ProductList";
import { getAllProducts } from "@/db/productQueries";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <>
      <div className="flex justify-between border items-center w-full ">
        <PageHeader>Products</PageHeader>
        <button className="border rounded-2xl p-4 bg-secondaryBackground text-secondaryText">
          <Link href="/admin/products/add-product">Add Product</Link>
        </button>
      </div>
      <ProductList products={products} />
    </>
  );
}

"use client";

import { deleteProduct } from "@/db/productQueries";
import Link from "next/link";
import { Product } from "../shared.types";

export const ProductActions = ({ product }: { product: Product }) => {
  const handleDelete = async () => {
    await deleteProduct(product.id, product.name);
    window.location.reload(); // Refresh the page for now, later will probably add state and make this fancier
  };
  const firstColorId = product.stock[0].color.id;

  return (
    <div className="flex items-center justify-center max-w-fit">
      <Link
        href={`/admin/products/${product.id}/${firstColorId}`}
        className="border rounded-xl p-2 px-4 bg-gray-400 text-secondaryText  hover:bg-secondaryBackground"
      >
        View
      </Link>
      <button
        className="border rounded-xl p-2 px-4 bg-gray-400 text-secondaryText  hover:bg-secondaryBackground"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default ProductActions;

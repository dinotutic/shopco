"use client";

import { deleteProduct } from "@/db/productQueries";
import { Product } from "@prisma/client";

export default function ProductActions({ product }: { product: Product }) {
  const handleDelete = async () => {
    await deleteProduct(product.id, product.name);
    window.location.reload(); // Refresh the page for now, later will probably add state and make this fancier
  };
  return (
    <div className="flex flex-col">
      <button className="border rounded-2xl p-4 bg-gray-500 text-secondaryText">
        Edit
      </button>
      <button
        className="border rounded-2xl p-4 bg-gray-500 text-secondaryText"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}

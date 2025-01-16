"use client";

import { deleteProduct } from "@/db/productQueries";
import { Product } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const ProductActions = ({ product }: { product: Product }) => {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteProduct(product.id, product.name);
    window.location.reload(); // Refresh the page for now, later will probably add state and make this fancier
  };

  return (
    <div className="flex items-center justify-center max-w-fit">
      <Link
        href={`/admin/products/${product.id}`}
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

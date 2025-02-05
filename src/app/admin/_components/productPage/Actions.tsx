"use client";
import Button from "./Button";
import { deleteProduct } from "@/db/productQueries";
import Link from "next/link";
import { Product } from "../shared.types";

export const Actions = ({ product }: { product: Product }) => {
  const handleDelete = async () => {
    await deleteProduct(product.id);
    window.location.reload();
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
      {/* ONLY FOR DEV MODE */}
      <Button onClick={handleDelete}>Delete</Button>
      {/* ONLY FOR DEV MODE */}
    </div>
  );
};

export default Actions;

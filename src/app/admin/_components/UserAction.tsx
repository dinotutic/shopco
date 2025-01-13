// "use client";

// import { deleteProduct } from "@/db/productQueries";
// import { Product } from "@prisma/client";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function ProductActions({ product }: { product: Product }) {
//   const router = useRouter();

//   const handleDelete = async () => {
//     await deleteProduct(product.id, product.name);
//     window.location.reload(); // Refresh the page for now, later will probably add state and make this fancier
//   };

//   return (
//     <div className="flex">
//       <Link
//         href={`/admin/products/${product.id}`}
//         className="border rounded-2xl p-4 bg-gray-500 text-secondaryText  hover:bg-secondaryBackground"
//       >
//         View
//       </Link>
//       <button
//         className="border rounded-2xl p-4 bg-gray-500 text-secondaryText  hover:bg-secondaryBackground"
//         onClick={handleDelete}
//       >
//         Delete
//       </button>
//     </div>
//   );
// }
import User
const UserActions = ({ user }: {use: }) => {}
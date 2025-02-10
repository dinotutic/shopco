import { formatCurrency } from "@/app/lib/formatters";
import Link from "next/link";
import { Order } from "../shared.types";
interface CustomersSectionProps {
  purchases: Order[];
}
const PurchasesSection = ({ purchases }: CustomersSectionProps) => {
  return (
    <section className="mb-6 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Purchases</h2>
      {purchases.length > 0 ? (
        <PurchasesList purchases={purchases} />
      ) : (
        // <ul>
        //   {/* {purchases.map((purchase) => (
        //     // <li key={purchase.id} className="mb-2 p-2 border-b">
        //     //   <p className="text-gray-700">
        //     //     <span className="font-semibold">Order ID:</span>{" "}
        //     //     <Link
        //     //       href={`/admin/orders/${purchase.id}`}
        //     //       className="text-blue-500 hover:underline"
        //     //     >
        //     //       {purchase.id}
        //     //     </Link>
        //     //   </p>
        //     //   <p className="text-gray-700">
        //     //     <span className="font-semibold">Total:</span>{" "}
        //     //     {formatCurrency(purchase.totalInCents)}
        //     //   </p>
        //     //   <p className="text-gray-700">
        //     //     <span className="font-semibold">Date:</span>{" "}
        //     //     {new Date(purchase.createdAt).toLocaleDateString()}
        //     //   </p>
        //     // </li>
        //   ))} */}
        // </ul>
        <p>No purchases found</p>
      )}
    </section>
  );
};

const PurchasesList = ({ purchases }: { purchases: Order[] }) => {
  return (
    <ul>
      {purchases.map((purchase) => (
        <li key={purchase.id} className="mb-2 p-2 border-b">
          <p className="text-gray-700">
            <span className="font-semibold">Order ID:</span>{" "}
            <Link
              href={`/admin/orders/${purchase.id}`}
              className="text-blue-500 hover:underline"
            >
              {purchase.id}
            </Link>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Total:</span>{" "}
            {formatCurrency(purchase.totalInCents)}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Date:</span>{" "}
            {new Date(purchase.createdAt).toLocaleDateString()}
          </p>
        </li>
      ))}
    </ul>
  );
};
export default PurchasesSection;

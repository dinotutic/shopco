"use client";
import Link from "next/link";

export const OrdersActions = ({ orderId }: { orderId: number }) => {
  return (
    <Link
      href={`/admin/orders/${orderId}`}
      className="border rounded-xl p-2 px-4 bg-gray-400 text-secondaryText  hover:bg-secondaryBackground"
    >
      View
    </Link>
  );
};

export default OrdersActions;

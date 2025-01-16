import Link from "next/link";

import { formatCurrency } from "@/app/lib/formatters";

import { FC } from "react";

interface OrderDetailProps {
  order: {
    id: string;
    userId: string;
    user: {
      name: string;
      email: string;
    };
    totalInCents: number;
    createdAt: string;
    items: {
      id: string;
      product: {
        id: string;
        name: string;
      };
      color: {
        name: string;
      };
      quantity: number;
      price: number;
    }[];
  };
  totalItems: number;
}

const OrderDetail: FC<OrderDetailProps> = ({ order, totalItems }) => {
  return (
    <>
      <section className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Order Data</h2>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Order ID:</span> {order.id}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Customer ID:</span> {order.userId}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Customer Name:</span>{" "}
          <Link
            href={`/admin/customers/${order.userId}`}
            className="text-blue-500 hover:underline"
          >
            {order.user.name}
          </Link>
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Customer Email:</span>{" "}
          {order.user.email}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Total items:</span> {totalItems}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Total:</span>{" "}
          {formatCurrency(order.totalInCents)}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Created At:</span>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </section>

      <section className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Items</h2>
        {order.items.length > 0 ? (
          <ul>
            {order.items.map((item) => (
              <li key={item.id} className="mb-2 p-2 border-b">
                <p className="text-gray-700">
                  <span className="font-semibold">Product:</span>{" "}
                  <Link
                    href={`/admin/products/${item.product.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {item.product.name}
                  </Link>
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Color:</span>{" "}
                  {item.color.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Quantity:</span>{" "}
                  {item.quantity}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Price:</span>{" "}
                  {formatCurrency(item.price)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items found</p>
        )}
      </section>
    </>
  );
};

export default OrderDetail;

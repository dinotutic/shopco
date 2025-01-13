"use client";
import React, { useState } from "react";

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  password: string | null;
};

export type OrderItem = {
  id: number;
  productId: number;
  orderId: number;
  colorId: number;
  quantity: number;
  price: number;
  size: string;
  product?: {
    name: string;
  };
  color?: {
    name: string;
  };
  createdAt?: Date;
};

export type OrderProps = {
  id: number;
  totalInCents: number;
  createdAt: Date;
  items: OrderItem[];
  user: User;
  userId: number;
};

const SalesList = ({ sales }: { sales: OrderProps[] }) => {
  return (
    <>
      <table className="w-full border m-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-b border-r border-gray-300 text-start">
              ID
            </th>
            <th className="py-2 px-4 border-b border-r border-gray-300 text-start">
              Customer
            </th>
            <th className="py-2 px-4 border-b border-r border-gray-300 text-start">
              Total
            </th>
            <th className="py-2 px-4 border-b border-r border-gray-300 text-start">
              Date
            </th>
            <th className="py-2 px-4 border-b text-start">Items</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-r">{sale.id}</td>
              <td className="py-2 px-4 border-b border-r">{sale.user.name}</td>
              <td className="py-2 px-4 border-b border-r">
                {(sale.totalInCents / 100).toFixed(2)}€
              </td>
              <td className="py-2 px-4 border-b border-r">
                {new Date(sale.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">
                <ToggleItems items={sale.items} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const ToggleItems = ({ items }: { items: OrderItem[] }) => {
  const [showItems, setShowItems] = useState(false);

  const toggleItems = () => {
    setShowItems(!showItems);
  };

  return (
    <div>
      <button
        onClick={toggleItems}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        {showItems ? "Hide Items" : "Show Items"}
      </button>
      {showItems && (
        <ul className="mt-2">
          {items.map((item) => (
            <li key={item.id}>
              {item.product?.name || "Unknown Product"} (x{item.quantity})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SalesList;

"use client";
import React, { useState } from "react";
import OrdersActions from "./OrdersActions";

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

const OrdersList = ({ orders }: { orders: OrderProps[] }) => {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  const filteredOrders = orders.filter((order) => {
    const matchesSearchFilter = order.user.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesSearchFilter;
  });

  const sortedOrders = filteredOrders.sort((a, b) => {
    if (sort === "priceAsc") {
      return a.totalInCents - b.totalInCents;
    }
    if (sort === "priceDesc") {
      return b.totalInCents - a.totalInCents;
    }
    if (sort === "dateAsc") {
      return a.createdAt.getTime() - b.createdAt.getTime();
    }
    if (sort === "dateDesc") {
      return b.createdAt.getTime() - a.createdAt.getTime();
    }
    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <div className="flex my-8 justify-between items-center">
        <h1 className="text-xl text-gray-500">Filters:</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded-xl"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border p-2 rounded-xl"
          >
            <option value="">Sort by</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="dateAsc">Date: Old to New</option>
            <option value="dateDesc">Date: New To Old</option>
          </select>
        </div>
      </div>
      <table className="w-full border-separate border-spacing-0">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border rounded-tl-lg border-gray-300 text-start">
              ID
            </th>
            <th className="py-2 px-4 border-y border-r border-gray-300 text-start">
              Customer
            </th>
            <th className="py-2 px-4 border-y border-r border-gray-300 text-start">
              Total
            </th>
            <th className="py-2 px-4 border-y border-r border-gray-300 text-start">
              Date
            </th>
            <th className="py-2 px-4 border-y rounded-tr-lg border-gray-300 text-start">
              Items
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order, index) => (
            <tr key={order.id} className="hover:bg-gray-100">
              <td
                className={`px-4 border-b border-r border-l ${
                  index === orders.length - 1 ? "rounded-bl-lg" : ""
                }`}
              >
                {order.id}
              </td>
              <td className="py-2 px-4 border-b border-r">{order.user.name}</td>
              <td className="py-2 px-4 border-b border-r">
                {(order.totalInCents / 100).toFixed(2)}€
              </td>
              <td className="py-2 px-4 border-b border-r">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td
                className={`py-2 px-4 border-b border-r w-10 ${
                  index === orders.length - 1 ? "rounded-br-lg" : ""
                }`}
              >
                <OrdersActions orderId={order.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;

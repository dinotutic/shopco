"use client";
import React, { useState } from "react";
import OrdersActions from "./OrdersActions";
import TableComponent from "../TableComponent";
import { formatCurrency } from "@/app/lib/formatters";
import { OrderItem, User } from "../shared.types";

export type OrderProps = {
  id: number;
  totalInCents: number;
  createdAt: Date;
  items: OrderItem[];
  user: User;
  userId: number;
};

const OrdersList = ({ orders }: { orders: OrderProps[] }) => {
  // I dont like the way I filter stuff. Will redo this sometime later

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

  const tableHeaders = [
    { id: "id", label: "ID", render: (row: OrderProps) => row.id },
    {
      id: "customer",
      label: "Customer",
      render: (row: OrderProps) => row.user.name,
    },
    {
      id: "total",
      label: "Total",
      render: (row: OrderProps) => formatCurrency(row.totalInCents),
    },
    {
      id: "date",
      label: "Date",
      render: (row: OrderProps) => row.createdAt.toLocaleDateString("de-DE"),
    },
    {
      id: "actions",
      label: "Actions",
      render: (row: OrderProps) => <OrdersActions orderId={row.id} />,
    },
  ];

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
      <TableComponent data={sortedOrders} headers={tableHeaders} />
    </div>
  );
};

export default OrdersList;

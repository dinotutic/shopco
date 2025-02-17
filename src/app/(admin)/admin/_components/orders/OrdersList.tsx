"use client";
import React, { useState } from "react";
import OrdersActions from "./OrdersActions";
import TableComponent from "../TableComponent";
import { formatCurrency } from "@/app/lib/formatters";
import { Order } from "../../../../types/shared.types";
import { filterOrders } from "@/app/lib/filterUtil";
import { sortOrders } from "@/app/lib/sortUtils";
import SortComponent from "../SortComponent";
import SearchComponent from "../SearchComponent";

interface OrderProps {
  orders: Order[];
}
const OrdersList = ({ orders }: OrderProps) => {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  const filteredOrders = filterOrders(orders, search);
  const sortedOrders = sortOrders(filteredOrders, sort);

  const tableHeaders = [
    { id: "id", label: "ID", render: (row: Order) => row.id },
    {
      id: "customer",
      label: "Customer",
      render: (row: Order) => row.user.name,
    },
    {
      id: "total",
      label: "Total",
      render: (row: Order) => formatCurrency(row.totalInCents),
    },
    {
      id: "date",
      label: "Date",
      render: (row: Order) => row.createdAt.toLocaleDateString("de-DE"),
    },
    {
      id: "actions",
      label: "Actions",
      render: (row: Order) => <OrdersActions orderId={row.id} />,
    },
  ];
  const sortOptions = [
    {
      label: "Total: Low to High",
      value: "totalAsc",
    },
    { label: "Total: High to Low", value: "totalDesc" },
    { label: "Date: Old to New", value: "dateAsc" },
    { label: "Date: New to Old", value: "dateDesc" },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="flex my-8 justify-between items-center">
        <h1 className="text-xl text-gray-500">Filters:</h1>
        <div className="flex gap-4">
          <SearchComponent
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name"
          />
          <SortComponent
            options={sortOptions}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            placeholder="Sort by"
          />
        </div>
      </div>
      <TableComponent data={sortedOrders} headers={tableHeaders} />
    </div>
  );
};

export default OrdersList;

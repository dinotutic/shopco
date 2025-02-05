"use client";
import { User } from "@prisma/client";
import { CustomerActions } from "./CustomerActions";
import { useState } from "react";
import TableComponent from "../TableComponent";

const CustomersList = ({ customers }: { customers: User[] }) => {
  // Will redo sorting and filtering. Dont like it

  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearchFilter = customer.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesSearchFilter;
  });

  const sortedCustomers = filteredCustomers.sort((a, b) => {
    if (sort === "memberSinceAsc") {
      return a.createdAt.getTime() - b.createdAt.getTime();
    }
    if (sort === "memberSinceDesc") {
      return b.createdAt.getTime() - a.createdAt.getTime();
    }
    return 0;
  });

  const tableHeaders = [
    {
      id: "id",
      label: "ID",
      render: (row: User) => row.id,
    },
    {
      id: "customer",
      label: "Customer",
      render: (row: User) => row.name,
    },
    {
      id: "email",
      label: "Email",
      render: (row: User) => row.email,
    },
    {
      id: "memberSince",
      label: "Member since",
      render: (row: User) => row.createdAt.toLocaleDateString(),
    },
    {
      id: "actions",
      label: "Actions",
      render: (row: User) => <CustomerActions customerId={row.id} />,
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
            <option value="memberSinceAsc">Member since: Old to New</option>
            <option value="memberSinceDesc">Member since: New to Old</option>
          </select>
        </div>
      </div>
      <TableComponent headers={tableHeaders} data={sortedCustomers} />
    </div>
  );
};

export default CustomersList;

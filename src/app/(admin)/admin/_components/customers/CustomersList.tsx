"use client";
import { User } from "@prisma/client";
import { CustomerActions } from "./CustomerActions";
import { useState } from "react";
import TableComponent from "../TableComponent";
import SearchComponent from "../SearchComponent";
import SortComponent from "../SortComponent";
import { filterCustomers } from "@/app/lib/filterUtil";
import { sortCustomers } from "@/app/lib/sortUtils";

interface CustomerListProps {
  customers: User[];
}
const CustomersList = ({ customers }: CustomerListProps) => {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  const filteredCustomers = filterCustomers(customers, search);
  const sortedCustomers = sortCustomers(filteredCustomers, sort);

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

  const sortOptions = [
    {
      label: "Member since: Old to New",
      value: "memberSinceAsc",
    },
    {
      label: "Member since: New to Old",
      value: "memberSinceDesc",
    },
  ];
  return (
    <div className="overflow-x-auto">
      <div className="flex my-8 justify-between items-center">
        <h1 className="text-xl text-gray-500">Filters:</h1>
        <div className="flex gap-4">
          <SearchComponent
            value={search}
            onChange={setSearch}
            placeholder="Search by name"
          />
          <SortComponent
            value={sort}
            onChange={setSort}
            options={sortOptions}
            placeholder="Sort by"
          />
        </div>
      </div>
      <TableComponent headers={tableHeaders} data={sortedCustomers} />
    </div>
  );
};

export default CustomersList;

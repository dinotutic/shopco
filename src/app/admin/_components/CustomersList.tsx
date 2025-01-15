"use client";
import { User } from "@prisma/client";
import { CustomerActions } from "./CustomerActions";
import { useState } from "react";

const CustomersList = ({ customers }: { customers: User[] }) => {
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
      <table className="w-full border-separate border-spacing-0">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border rounded-tl-lg border-gray-300 text-start">
              ID
            </th>
            <th className="py-2 px-4 border-y border-r border-gray-300 text-start">
              User
            </th>
            <th className="py-2 px-4 border-y border-r border-gray-300 text-start">
              Email
            </th>
            <th className="py-2 px-4 border-y border-r border-gray-300 text-start whitespace-nowrap">
              Member since
            </th>
            <th className="py-2 px-4 border-y rounded-tr-lg border-gray-300 text-start">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedCustomers.map((customer, index) => (
            <tr key={customer.id} className="hover:bg-gray-100">
              <td
                className={`px-4 border-b border-r border-l ${
                  index === customers.length - 1 ? "rounded-bl-lg" : ""
                }`}
              >
                {customer.id}
              </td>
              <td className="py-2 px-4 border-b border-r">{customer.name}</td>
              <td className="py-2 px-4 border-b border-r">{customer.email}</td>
              <td className="py-2 px-4 border-b border-r">
                {customer.createdAt.toLocaleDateString()}
              </td>
              <td
                className={`py-2 px-4 border-b border-r w-10 ${
                  index === customers.length - 1 ? "rounded-br-lg" : ""
                }`}
              >
                <CustomerActions customerId={customer.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersList;

"use client";

import { useState } from "react";
import ProductActions from "./ProductActions";

type Product = {
  id: number;
  name: string;
  description: string;
  priceInCents: number;
  stock: { id: number; size: string; quantity: number; productId: number }[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  style: { id: number; name: string };
  category: { id: number; name: string };
  images: { url: string }[];
  categoryId: number;
  styleId: number;
  gender: string;
  sale: number;
  details: string;
  newArrival: boolean;
  topSelling: boolean;
};

export default function ProductList({
  products,
  categories,
  styles,
}: {
  products: Product[];
  categories: { id: number; name: string }[];
  styles: { id: number; name: string }[];
}) {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [styleFilter, setStyleFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [availabilityFilter, setAvailabilityFilter] = useState<boolean | null>(
    null
  );
  const [sexFilter, setSexFilter] = useState<string | null>(null);

  // To format JSX
  const formateSex = (sex: string) => {
    if (sex === "male") {
      return "M";
    } else if (sex === "female") {
      return "F";
    } else if (sex === "unisex") {
      return "U";
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesNameFilter = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesAvailability =
      availabilityFilter === null || product.isAvailable === availabilityFilter;
    const matchesCategory =
      categoryFilter === null || product.category.name === categoryFilter;
    const matchesStyle =
      styleFilter === null || product.style.name === styleFilter;
    const matchesSex = sexFilter === null || product.gender === sexFilter;

    return (
      matchesNameFilter &&
      matchesAvailability &&
      matchesCategory &&
      matchesStyle &&
      matchesSex
    );
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sort === "priceAsc") {
      return a.priceInCents - b.priceInCents;
    } else if (sort === "priceDesc") {
      return b.priceInCents - a.priceInCents;
    } else if (sort === "nameAsc") {
      return a.name.localeCompare(b.name);
    } else if (sort === "nameDesc") {
      return b.name.localeCompare(a.name);
    } else {
      return 0;
    }
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
            <option value="nameAsc">Name: A to Z</option>
            <option value="nameDesc">Name: Z to A</option>
          </select>
          <select
            value={categoryFilter ?? ""}
            onChange={(e) =>
              setCategoryFilter(e.target.value === "" ? null : e.target.value)
            }
            className="border p-2 rounded-xl"
          >
            <option value="">Categories</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={styleFilter ?? ""}
            onChange={(e) =>
              setStyleFilter(e.target.value === "" ? null : e.target.value)
            }
            className="border p-2 rounded-xl"
          >
            <option value="">Styles</option>
            {styles.map((style) => (
              <option key={style.name} value={style.name}>
                {style.name}
              </option>
            ))}
          </select>
          <select
            value={
              availabilityFilter !== null ? availabilityFilter.toString() : ""
            }
            onChange={(e) =>
              setAvailabilityFilter(
                e.target.value === "" ? null : e.target.value === "true"
              )
            }
            className="border p-2 rounded-xl"
          >
            <option value="">Availability</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
          <select
            value={sexFilter ?? ""}
            onChange={(e) =>
              setSexFilter(e.target.value === "" ? null : e.target.value)
            }
            className="border p-2 rounded-xl"
          >
            <option value="">Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>
      </div>

      <table className="w-full border-separate border-spacing-0">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border rounded-tl-lg border-gray-300 text-start">
              ID
            </th>
            <th className="px-4 py-2 border-r border-y border-gray-300 text-start">
              Name
            </th>
            <th className="px-4 py-2 border-r border-y border-gray-300 text-start">
              Price
            </th>
            <th className="px-4 py-2 border-r border-y border-gray-300 text-start">
              Sex
            </th>
            <th className="px-4 py-2 border-r border-y border-gray-300 text-start">
              Stock
            </th>
            <th className="px-4 py-2 border-r border-y border-gray-300 text-start">
              Category
            </th>
            <th className="px-4 py-2 border-r border-y border-gray-300 text-start">
              Style
            </th>
            <th className="px-4 py-2 border-r border-y rounded-tr-lg border-gray-300 text-start">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product, index) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td
                className={`px-4 border-b border-r w-10 border-l ${
                  index === sortedProducts.length - 1 ? "rounded-bl-lg" : ""
                }`}
              >
                {product.id}
              </td>
              <td className="px-4 border-b border-r">{product.name}</td>
              <td className="px-4 border-b border-r">
                {(product.priceInCents / 100).toFixed(2)}€
              </td>
              <td className="px-4 border-b border-r">
                {formateSex(product.gender)}
              </td>
              <td className="px-4 border-b border-r">
                {product.stock.reduce(
                  (total, stock) => total + stock.quantity,
                  0
                )}
              </td>
              <td className="px-4 border-b border-r">
                {product.category.name}
              </td>
              <td className="px-4 border-b border-r">{product.style.name}</td>
              <td
                className={`px-4 border-b border-r w-10 ${
                  index === sortedProducts.length - 1 ? "rounded-br-lg" : ""
                }`}
              >
                <ProductActions product={product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

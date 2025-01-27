"use client";

import { useState } from "react";
import Actions from "./Actions";
import { Category, Color, Gender, Style } from "@prisma/client";

type Product = {
  id: number;
  name: string;
  description: string;
  priceInCents: number;
  stock: {
    id: number;
    color: Color;
    size: string;
    quantity: number;
    productId: number;
  }[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  style: Style;
  category: Category;
  images: { url: string }[];
  categoryId: number;
  styleId: number;
  gender: Gender;
  sale: number;
  details: string;
  newArrival: boolean;
  topSelling: boolean;
};

export default function ProductList({
  products,
  categories,
  styles,
  genders,
}: {
  products: Product[];
  categories: Category[];
  styles: Style[];
  genders: Gender[];
}) {
  console.log(products);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [styleFilter, setStyleFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [availabilityFilter, setAvailabilityFilter] = useState<boolean | null>(
    null
  );
  const [genderFilter, setGenderFilter] = useState<string | null>(null);

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
    const matchesGender =
      genderFilter === null || product.gender.name === genderFilter;

    return (
      matchesNameFilter &&
      matchesAvailability &&
      matchesCategory &&
      matchesStyle &&
      matchesGender
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
            value={genderFilter ?? ""}
            onChange={(e) =>
              setGenderFilter(e.target.value === "" ? null : e.target.value)
            }
            className="border p-2 rounded-xl"
          >
            <option value="">Gender</option>
            {genders.map((gender) => (
              <option key={gender.name} value={gender.name}>
                {gender.name}
              </option>
            ))}
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
              Gender
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
              <td className="px-4 border-b border-r">{product.gender.name}</td>
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
                <Actions product={product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

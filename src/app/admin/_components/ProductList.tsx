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
  const sizes = ["XS", "S", "M", "L", "XL"];
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [styleFilter, setStyleFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [availabilityFilter, setAvailabilityFilter] = useState<boolean | null>(
    null
  );
  const [sexFilter, setSexFilter] = useState<string | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesNameFilter = product.name
      .toLowerCase()
      .includes(filter.toLowerCase());
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

  // To format JSX
  const formattingSex = (product: Product) => {
    if (product.gender === "male") {
      return "M";
    } else if (product.gender === "female") {
      return "F";
    } else if (product.gender === "unisex") {
      return "U";
    }
  };

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
      <div className="flex mb-4 justify-between">
        <h1 className="text-xl ml-4 text-gray-500">Filters:</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Filter by name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
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
      <table className="min-w-full bg-white border text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Images</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Available</th>
            <th className="py-2 px-4 border-b">Sex</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Stock</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Style</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.id}</td>
              {product.images && product.images.length > 0 ? (
                <td>
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="h-16 w-16 object-cover mb-2"
                  />
                </td>
              ) : (
                <td className="py-2 px-4 border-b>">No image</td>
              )}
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">
                {product.isAvailable ? "Y" : "N"}
              </td>
              {/* GENDER */}
              <td>{formattingSex(product)}</td>
              <td className="py-2 px-4 border-b">
                {(product.priceInCents / 100).toFixed(2)}€
              </td>
              <td className="py-2 px-4 border-b">
                <div className="flex gap-4 justify-center">
                  {sizes.map((size) => {
                    const stockEntry = product.stock.find(
                      (entry) => entry.size === size
                    );
                    return (
                      <div key={size} className="flex flex-col items-center">
                        <span>{size}</span>
                        <span>{stockEntry ? stockEntry.quantity : 0}</span>
                      </div>
                    );
                  })}
                </div>
              </td>
              <td className="py-2 px-4 border-b">{product.category.name}</td>
              <td className="py-2 px-4 border-b">{product.style.name}</td>
              <td className="py-2 px-4 border-b">
                <ProductActions product={product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

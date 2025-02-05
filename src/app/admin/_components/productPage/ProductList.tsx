"use client";

import { useState } from "react";
import Actions from "./Actions";
import { Category, Color, Gender, Style } from "@prisma/client";
import TableComponent from "../TableComponent";
import { ro } from "@faker-js/faker";
import FilterComponent from "../FilterComponent";
import { Product } from "../shared.types";
import { sortProducts } from "@/app/lib/sortUtils";
import SortComponent from "../SortComponent";
import SearchComponent from "../SearchComponent";

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
  const sortedProducts = sortProducts(filteredProducts, sort);

  const tableHaders = [
    {
      id: "id",
      label: "ID",
      render: (row: Product) => row.id,
    },
    {
      id: "name",
      label: "Name",
      render: (row: Product) => row.name,
    },
    {
      id: "price",
      label: "Price",
      render: (row: Product) => (row.priceInCents / 100).toFixed(2),
    },
    {
      id: "gender",
      label: "Gender",
      render: (row: Product) => row.gender.name,
    },
    {
      id: "stock",
      label: "Stock",
      render: (row: Product) =>
        row.stock.reduce((total, stock) => total + stock.quantity, 0),
    },
    {
      id: "category",
      label: "Category",
      render: (row: Product) => row.category.name,
    },
    {
      id: "style",
      label: "Style",
      render: (row: Product) => row.style.name,
    },
    {
      id: "actions",
      label: "Actions",
      render: (row: Product) => <Actions product={row} />,
    },
  ];

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.name,
  }));

  const styleOptions = styles.map((style) => ({
    label: style.name,
    value: style.name,
  }));

  const availabilityOptions = [
    { label: "Available", value: true },
    { label: "Not Available", value: false },
  ];

  const genderOptions = genders.map((gender) => ({
    label: gender.name,
    value: gender.name,
  }));

  const sortOptions = [
    { label: "Price: Low to High", value: "priceAsc" },
    { label: "Price: High to Low", value: "priceDesc" },
    { label: "Name: A to Z", value: "nameAsc" },
    { label: "Name: Z to A", value: "nameDesc" },
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
          {/* <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded-xl"
          /> */}
          <SortComponent
            options={sortOptions}
            placeholder="Sort by"
            value={sort}
            onChange={setSort}
          />
          <FilterComponent
            value={categoryFilter}
            onChange={(value) => setCategoryFilter(value as string | null)}
            options={categoryOptions}
            placeholder="Categories"
          />
          <FilterComponent
            value={styleFilter}
            options={styleOptions}
            onChange={(value) => setStyleFilter(value as string | null)}
            placeholder="Styles"
          />
          <FilterComponent
            value={availabilityFilter}
            options={availabilityOptions}
            onChange={(value) => setAvailabilityFilter(value as boolean | null)}
            placeholder="Availability"
          />
          <FilterComponent
            value={genderFilter}
            options={genderOptions}
            onChange={(value) => setGenderFilter(value as string | null)}
            placeholder="Gender"
          />
        </div>
      </div>
      <TableComponent data={sortedProducts} headers={tableHaders} />
    </div>
  );
}

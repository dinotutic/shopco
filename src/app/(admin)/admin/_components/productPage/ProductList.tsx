"use client";

import { useState } from "react";
import Actions from "./Actions";
import TableComponent from "../TableComponent";
import FilterComponent from "../FilterComponent";
import { FormOptions, Product } from "../../../../types/shared.types";
import { sortProducts } from "@/app/lib/sortUtils";
import SortComponent from "../SortComponent";
import SearchComponent from "../SearchComponent";
import { filterProducts } from "@/app/lib/filterUtil";
import useProductFilters from "../../hooks/useProductFilters";

interface ProductListProps {
  products: Product[];
  formOptions: FormOptions;
}
export default function ProductList({
  products,
  formOptions,
}: ProductListProps) {
  const { filterState, setFilterField } = useProductFilters();
  const {
    search,
    sort,
    styleFilter,
    availabilityFilter,
    categoryFilter,
    genderFilter,
  } = filterState;

  const { categories, styles, genders } = formOptions;
  const filteredProducts = filterProducts(
    products,
    search,
    availabilityFilter,
    categoryFilter,
    styleFilter,
    genderFilter
  );

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
            onChange={(e) => setFilterField("search", e.target.value)}
            placeholder="Search by name"
          />
          <SortComponent
            options={sortOptions}
            placeholder="Sort by"
            value={sort}
            onChange={(e) => setFilterField("sort", e.target.value)}
          />
          <FilterComponent
            value={categoryFilter}
            onChange={(value) =>
              setFilterField("categoryFilter", value as string | null)
            }
            options={categoryOptions}
            placeholder="Categories"
          />
          <FilterComponent
            value={styleFilter}
            options={styleOptions}
            onChange={(value) =>
              setFilterField("styleFilter", value as string | null)
            }
            placeholder="Styles"
          />
          <FilterComponent
            value={availabilityFilter}
            options={availabilityOptions}
            onChange={(value) =>
              setFilterField("availabilityFilter", value as boolean | null)
            }
            placeholder="Availability"
          />
          <FilterComponent
            value={genderFilter}
            options={genderOptions}
            onChange={(value) =>
              setFilterField("genderFilter", value as string | null)
            }
            placeholder="Gender"
          />
        </div>
      </div>
      <TableComponent data={sortedProducts} headers={tableHaders} />
    </div>
  );
}

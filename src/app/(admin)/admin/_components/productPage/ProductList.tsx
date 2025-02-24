"use client";

import TableComponent from "../TableComponent";
import FilterComponent from "../FilterComponent";
import { FormOptions, Product } from "../../../../types/shared.types";
import { sortProducts } from "@/app/lib/sortUtils";
import SortComponent from "../SortComponent";
import SearchComponent from "../SearchComponent";
import { filterProducts } from "@/app/lib/filterUtil";
import useProductFilters from "../../hooks/useProductFilters";
import { tableHaders, sortOptions } from "./productConstants";
import { filterHandlers } from "./filterHandlers";

interface ProductListProps {
  products: Product[];
  formOptions: FormOptions;
}
export default function ProductList({
  products,
  formOptions,
}: ProductListProps) {
  const { filterState, setFilterField, filterOptions } =
    useProductFilters(formOptions);

  const {
    search,
    sort,
    styleFilter,
    availabilityFilter,
    categoryFilter,
    genderFilter,
  } = filterState;

  const {
    handleSearchChange,
    handleSortChange,
    handleCategoryChange,
    handleStyleChange,
    handleAvailabilityChange,
    handleGenderChange,
  } = filterHandlers(setFilterField);

  const filteredProducts = filterProducts(
    products,
    search,
    availabilityFilter,
    categoryFilter,
    styleFilter,
    genderFilter
  );

  const sortedProducts = sortProducts(filteredProducts, sort);

  return (
    <div className="overflow-x-auto">
      <div className="flex my-8 justify-between items-center">
        <h1 className="text-xl text-gray-500">Filters:</h1>
        <div className="flex gap-4">
          <SearchComponent
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by name"
          />
          <SortComponent
            options={sortOptions}
            placeholder="Sort by"
            value={sort}
            onChange={handleSortChange}
          />
          <FilterComponent
            value={categoryFilter}
            onChange={handleCategoryChange}
            options={filterOptions.categoryOptions}
            placeholder="Categories"
          />
          <FilterComponent
            value={styleFilter}
            options={filterOptions.styleOptions}
            onChange={handleStyleChange}
            placeholder="Styles"
          />
          <FilterComponent
            value={availabilityFilter}
            options={filterOptions.availabilityOptions}
            onChange={handleAvailabilityChange}
            placeholder="Availability"
          />
          <FilterComponent
            value={genderFilter}
            options={filterOptions.genderOptions}
            onChange={handleGenderChange}
            placeholder="Gender"
          />
        </div>
      </div>
      <TableComponent data={sortedProducts} headers={tableHaders} />
    </div>
  );
}

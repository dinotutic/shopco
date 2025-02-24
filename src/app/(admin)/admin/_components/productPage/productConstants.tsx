import { Product } from "@/app/types/shared.types";
import Actions from "./Actions";

export const tableHaders = [
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

export const sortOptions = [
  { label: "Price: Low to High", value: "priceAsc" },
  { label: "Price: High to Low", value: "priceDesc" },
  { label: "Name: A to Z", value: "nameAsc" },
  { label: "Name: Z to A", value: "nameDesc" },
];

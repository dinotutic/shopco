import { Review } from "@/app/types/shared.types";
import ReviewsActions from "./ReviewsActions";

export const tableHeaders = [
  { id: "id", label: "ID", render: (row: Review) => row.id },
  { id: "customer", label: "Customer", render: (row: any) => row.user.name },
  { id: "product", label: "Product", render: (row: any) => row.product.name },
  { id: "rating", label: "Rating", render: (row: any) => row.rating },
  { id: "comment", label: "Comment", render: (row: any) => row.comment },
  {
    id: "date",
    label: "Date",
    render: (row: any) => row.createdAt.toLocaleDateString("de-DE"),
  },
  {
    id: "highlighted",
    label: "Highlighted",
    render: (row: any) => (row.highlighted ? "Yes" : "No"),
  },
  {
    id: "actions",
    label: "Actions",
    render: (row: any) => <ReviewsActions review={row} />,
  },
];

export const sortOptions = [
  { label: "Rating: Low to High", value: "ratingAsc" },
  { label: "Rating: High to Low", value: "ratingDesc" },
  { label: "Date: Old to New", value: "dateAsc" },
  { label: "Date: New to Old", value: "dateDesc" },
];

export const filterOptions = {
  highlightedOptions: [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ],
  ratingOptions: [
    { label: "1 Star", value: "1" },
    { label: "2 Stars", value: "2" },
    { label: "3 Stars", value: "3" },
    { label: "4 Stars", value: "4" },
    { label: "5 Stars", value: "5" },
  ],
  commentFilter: [
    { label: "Included", value: true },
    { label: "Not Included", value: false },
  ],
};

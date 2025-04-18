import { ReactNode } from "react";

export interface Image {
  url?: string;
  isNew?: boolean;
  markedForDeletion?: boolean;
  id?: number;
  productId?: number;
  file?: File;
  color?: Color;
  colorId?: number;
}

export interface Style {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Size {
  id: number;
  name: string;
}

export interface Gender {
  id: number;
  name: string;
}

export interface Stock {
  id?: number;
  productId?: number;
  quantity: number;
  size: Size;
  color: Color;
  isNew?: boolean;
}

export interface Color {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  priceInCents: number;
  stock: Stock[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
  style: Style;
  images: Image[];
  gender: Gender;
  sale: number;
  details: string;
  newArrival: boolean;
  topSelling: boolean;
  reviews: Omit<Review, "product" | "user">[];
}

export interface OrderItem {
  id: number;
  productId: number;
  product: Product;
  colorId: number;
  color: Color;
  size: string;
  quantity: number;
  price: number;
  orderId: number;
}

export interface Order {
  id: number;
  totalInCents: number;
  createdAt: Date;
  items: OrderItem[];
  user: User;
  userId: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TableHeader {
  id: string;
  label: string;
  render: (row: any) => ReactNode;
}

export interface CustomerSalesStats {
  amount: number;
  numberOfOrders: number;
}

export interface Review {
  id: number;
  user: User;
  userId: number;
  rating: number;
  comment: string | null;
  createdAt: Date;
  productId: number;
  product: Product;
  highlighted: boolean;
}

export interface FormOptions {
  categories: Category[];
  styles: Style[];
  colors: Color[];
  genders: Gender[];
  sizes: Size[];
}

export interface ProductFilters {
  category: string | null;
  style: string | null;
  color: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  page: number | null;
  perPage: number | null;
}

// might need to use this later
// product: Omit<Product, "reviews" | "user"> & {
//   reviews: Omit<Review, "product" | "user">[];
// };

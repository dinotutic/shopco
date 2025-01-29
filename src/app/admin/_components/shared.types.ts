import { Gender } from "@prisma/client";

export interface Image {
  url?: string;
  isNew?: boolean;
  markedForDeletion?: boolean;
  id?: number;
  productId?: number;
  file?: File;
}

export interface Style {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Stock {
  id: number;
  productId: number;
  size: string;
  quantity: number;
  color: Color;
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

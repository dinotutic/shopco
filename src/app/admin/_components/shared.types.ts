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

export interface ProductHandleSubmitProps {
  name: string;
  description: string;
  details: string;
  stock: {
    size: string;
    quantity: number;
    color: { name: string; id: number };
  }[];
  priceInCents: number;
  isAvailable: boolean;
  topSelling: boolean;
  newArrival: boolean;
  sale: number;
  gender: Gender;
  category: Category;
  style: Style;
  images: Image[];
}

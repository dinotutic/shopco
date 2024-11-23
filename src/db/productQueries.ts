"use server";

// import { z } from "zod";
import prisma from "./prisma";

// z.object({
//   name: z.string().min(1),
//   description: z.string().min(1),
//   priceInCents: z.coerce.number().int().min(1),
//   stock: z.coerce.number().int().min(1),
//   isAvailable: z.boolean(),
//   image: z.string().min(1),
// });

export async function getAllProducts() {
  const products = await prisma.product.findMany();
  return products;
}

export async function addProduct(formData: FormData) {
  console.log("Logging form data", formData);
  console.log("category: ", formData.get("category"));
  console.log("style: ", formData.get("style"));
}

export async function getCategories() {
  const data = await prisma.category.findMany();
  const categories = data.map((category) => category.name);
  return categories;
}

export async function getStyles() {
  const data = await prisma.style.findMany();
  const styles = data.map((style) => style.name);
  return styles;
}

export async function getProductCount() {
  const [productCount, availableProducts] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { isAvailable: true } }),
  ]);
  return {
    productCount,
    availableProducts,
  };
}

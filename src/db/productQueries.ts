"use server";

import prisma from "./prisma";
import { uploadFile } from "@/app/lib/s3";

export async function getAllProducts() {
  const products = await prisma.product.findMany();
  return products;
}

export async function addProduct(formData: FormData) {
  const name = formData.get("name");
  const description = formData.get("description");
  const priceInCents = formData.get("priceInCents");
  const stock = formData.get("stock");
  const isAvailable = formData.get("isAvailable");
  const images = formData.getAll("images");
  const category = formData.get("category");
  const style = formData.get("style");

  // Upload images
  const imageUrls = [];
  for (const image of images) {
    if (!(image instanceof File) || !image.type.startsWith("image/")) {
      throw new Error("All files must be images");
    }
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const key = `products/images/${name}/${image.name}`;
    const imageUrl = await uploadFile(key, buffer, image.type);
    if (typeof imageUrl === "string") {
      imageUrls.push(imageUrl);
    }
  }
  console.log(imageUrls);
  // Create roduct in DB
  await prisma.product.create({
    data: {
      name: name as string,
      description: description as string,
      priceInCents: parseInt(priceInCents as string),
      stock: parseInt(stock as string),
      isAvailable: isAvailable === "true",
      category: {
        connect: {
          name: category as string,
        },
      },
      style: {
        connect: {
          name: style as string,
        },
      },
      images: {
        create: imageUrls.map((key) => ({ url: key })),
      },
    },
  });
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

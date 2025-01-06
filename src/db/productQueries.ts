"use server";

import prisma from "./prisma";
import { deleteFile, uploadFile } from "@/app/lib/s3";

export async function getAllProducts(page: number = 1) {
  const itemsPerPage = 50;

  const products = await prisma.product.findMany({
    take: itemsPerPage,
    skip: (page - 1) * itemsPerPage,
    include: { images: true, category: true, style: true, stock: true },
    orderBy: {
      id: "desc", // Sort by ID in descending order
    },
  });
  return products;
}

export async function getProductCount() {
  const [productCount, availableProducts] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { isAvailable: true } }),
  ]);
  return {
    productCount,
    availableProducts,
    totalPages: Math.ceil(productCount / 50), // 50 items per page
  };
}

// I should probably only delete image from s3 if DB delete was successful and vice versa. Will look into it sometime in the future
export async function deleteProduct(id: number, name: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true, stock: true },
  });
  if (!product) {
    throw new Error("Product not found");
  }
  console.log(`Deleting product ${product.name}`);

  // Delete related images from db

  await prisma.image.deleteMany({
    where: { productId: id },
  });

  await prisma.stock.deleteMany({ where: { productId: id } });
  await prisma.product.delete({ where: { id } });

  // Delete images from s3
  await deleteFile(`products/images/${id}`);
}

export async function addProduct(formData: FormData) {
  const name = formData.get("name");
  const description = formData.get("description");
  const priceInCents = formData.get("priceInCents");
  const stock = formData.get("stock");
  const isAvailable = formData.get("isAvailable") === "on";
  const images = formData.getAll("images");
  const category = formData.get("category");
  const style = formData.get("style");

  //Parse stock array to be usable here
  type StockData = { size: string; quantity: number }[];
  const stockData: StockData = JSON.parse(stock as string);

  // Create roduct in DB without the images.
  // Image links will be added after the images are uploaded to s3
  const newProduct = await prisma.product.create({
    data: {
      name: name as string,
      description: description as string,
      priceInCents: parseInt(priceInCents as string),
      isAvailable: isAvailable,
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

      stock: {
        create: stockData.map((item) => ({
          size: item.size,
          quantity: item.quantity,
        })),
      },
    },
  });
  const newProductId = newProduct.id;

  // Upload images to s3
  const imageUrls = [];
  for (const image of images) {
    if (!(image instanceof File) || !image.type.startsWith("image/")) {
      throw new Error("All files must be images");
    }
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const key = `products/images/${newProductId}/${image.name}`;
    const imageUrl = await uploadFile(key, buffer, image.type);
    if (typeof imageUrl === "string") {
      imageUrls.push(imageUrl);
    }
  }
  console.log("IMAGE URLS", imageUrls);
  await prisma.product.update({
    where: { id: newProductId },
    data: {
      images: {
        create: imageUrls.map((image) => ({ url: image })),
      },
    },
  });
  console.log(`Product added: ${name}`);
}

export async function getCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}

export async function getStyles() {
  const styles = await prisma.style.findMany();
  return styles;
}

export async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true, category: true, style: true, stock: true },
  });
  return product;
}

export async function editProduct(
  id: number,
  data: {
    name?: string;
    description?: string;
    priceInCents?: number;
    category?: { id: number; name: string };
    style?: { id: number; name: string };
    isAvailable?: boolean;
    images?: File[] | string[];
    stock: { size: string; quantity: number }[];
  },
  newImages: File[] = []
) {
  // Upload new images and get their URL
  const uploadedImages = await Promise.all(
    newImages.map(async (image) => {
      if (!(image instanceof File) || !image.type.startsWith("image/")) {
        throw new Error("All files must be images");
      }
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const key = `products/images/${id}/${image.name}`;
      const imageUrl = await uploadFile(key, buffer, image.type);
      if (typeof imageUrl === "string") {
        return { url: imageUrl };
      }
      return null;
    })
  ).then((images) => images.filter((image) => image !== null));

  // Update product in DB
  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      category: {
        connect: {
          id: data.category?.id,
        },
      },
      style: {
        connect: {
          id: data.style?.id,
        },
      },
      isAvailable: data.isAvailable,
      images: {
        create: uploadedImages.map((image) => ({ url: image.url })),
      },
    },
  });

  // Update stock quantities
  await Promise.all(
    data.stock.map(async (item) =>
      prisma.stock.updateMany({
        where: { productId: id, size: item.size },
        data: { quantity: item.quantity },
      })
    )
  );

  return updatedProduct;
}

export async function deleteSingleImage(productId: number, key: string) {
  // expected key = https://shopco-project.s3.eu-north-1.amazonaws.com/products/images/97/green thing.png
  const location = key.split("amazonaws.com/")[1];
  await deleteFile(location);
  await prisma.image.deleteMany({ where: { productId, url: key } });
}

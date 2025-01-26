"use server";

import prisma from "./prisma";
import { deleteFile, uploadFile } from "@/app/lib/s3";

export async function getAllProducts() {
  const products = await prisma.product.findMany({
    include: {
      images: true,
      category: true,
      style: true,
      stock: {
        include: { color: true },
      },
    },
    orderBy: {
      id: "desc", // Sort by ID in descending order
    },
  });
  if (products.length < 1) {
    throw new Error("No products found");
  }
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
////
// IF I ADD IMAGES TO COLORS LATER, THERE COULD BE ISSUES WHEN DELETING
////
// I should probably only delete image from s3 if DB delete was successful and vice versa. Will look into it sometime in the future
export async function deleteProduct(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true, stock: { include: { color: true } } },
  });
  if (!product) {
    throw new Error("Product not found");
  }
  console.log(`Deleting product ${product.name}`);

  // Delete related images from db

  await prisma.image.deleteMany({
    where: { productId: id },
  });

  // Delete related stock from db
  await prisma.stock.deleteMany({
    where: { productId: id },
  });

  // Delete the product itself
  await prisma.product.delete({
    where: { id },
  });

  // Delete images from s3
  await deleteFile(`products/images/${id}`);
}

export async function addProduct(data: {
  name: string;
  description: string;
  details: string;
  stock: {
    size: string;
    quantity: number;
    color: { name: string; id: number };
  }[];
  priceInCents: number;
  sex: string;
  isAvailable: boolean;
  topSelling: boolean;
  newArrival: boolean;
  sale: number;
  category: { id: number; name: string };
  style: { id: number; name: string };
  images: File[] | string[];
}) {
  // Create roduct in DB without the images.
  // Image links will be added after the images are uploaded to s3
  const newProduct = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      isAvailable: data.isAvailable,
      sale: data.sale,
      details: data.details,
      newArrival: data.newArrival,
      topSelling: data.topSelling,
      gender: data.sex,
      category: {
        connect: {
          id: data.category.id,
        },
      },
      style: {
        connect: {
          id: data.style.id,
        },
      },
      stock: {
        create: data.stock.map((item) => ({
          size: item.size,
          quantity: item.quantity,
          color: {
            connect: {
              id: item.color.id,
            },
          },
        })),
      },
    },
  });
  const newProductId = newProduct.id;

  // Upload images to s3
  const imageUrls = [];
  for (const image of data.images) {
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
  await prisma.product.update({
    where: { id: newProductId },
    data: {
      images: {
        create: imageUrls.map((image) => ({ url: image })),
      },
    },
  });
  console.log(`Product added: ${data.name}`);
}

export async function editProduct(
  id: number,
  data: {
    name?: string;
    description?: string;
    details: string;
    stock: {
      size: string;
      quantity: number;
      color: { name: string; id: number };
    }[];
    priceInCents?: number;
    sex: string;
    isAvailable?: boolean;
    topSelling: boolean;
    newArrival: boolean;
    sale: number;
    category?: { id: number; name: string };
    style?: { id: number; name: string };
    images?: File[] | string[];
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
  console.log(category);
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
      details: data.details,
      sale: data.sale,
      newArrival: data.newArrival,
      topSelling: data.topSelling,
      gender: data.sex,
    },
  });

  if (Array.isArray(data.stock)) {
    try {
      await Promise.all(
        data.stock.map(async (item) => {
          console.log("Updating stock item:", item);
          const result = await prisma.stock.updateMany({
            where: { productId: id, size: item.size, colorId: item.color.id },
            data: { quantity: item.quantity },
          });
          console.log("Update result:", result);
        })
      );
      console.log("Stock updated successfully");
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  } else {
    console.error("data.stock is not an array or is undefined");
  }

  return updatedProduct;
}

export async function deleteStock(stockId: number) {
  await prisma.stock.delete({ where: { id: stockId } });
}
export async function getCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}

export async function getStyles() {
  const styles = await prisma.style.findMany();
  return styles;
}

export async function getColors() {
  const colors = await prisma.color.findMany();
  return colors;
}

export async function getColorByColorId(colorId: number) {
  const color = await prisma.color.findUnique({ where: { id: colorId } });
  return color;
}

export async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
      category: true,
      style: true,
      stock: { include: { color: true } },
    },
  });
  return product;
}

export async function getProductByIdAndColor(id: number, colorId: number) {
  const product = await prisma.product.findUnique({
    where: {
      id,
      stock: {
        some: {
          colorId,
        },
      },
    },
    include: {
      images: true,
      category: true,
      style: true,
      stock: {
        include: {
          color: true,
        },
      },
    },
  });
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
}

export async function deleteSingleImage(productId: number, key: string) {
  // expected key = https://shopco-project.s3.eu-north-1.amazonaws.com/products/images/97/green thing.png
  try {
    const location = key.split("amazonaws.com/")[1];
    await deleteFile(location);
    await prisma.image.deleteMany({ where: { productId, url: key } });
  } catch (error) {
    throw new Error("Error deleting image");
  }
}

// export async function addProduct(formData: FormData) {
//   // GOTTA HANDLE THIS LATER
//   const name = formData.get("name");
//   const description = formData.get("description");
//   const details = formData.get("details");
//   const priceInCents = formData.get("priceInCents");
//   const stockJson = formData.get("stock");
//   const isAvailable = formData.get("isAvailable") === "on";
//   const images = formData.getAll("images");
//   const category = formData.get("category");
//   const style = formData.get("style");
//   const sale = formData.get("sale");
//   const newArrival = formData.get("newArrival") === "on";
//   const topSelling = formData.get("topSelling") === "on";
//   const sex = formData.get("sex");
//   console.log("backend");
//   console.log("formData", formData);
//   console.log("name", name);
//   console.log("description", description);
//   console.log("details", details);
//   console.log("priceInCents", priceInCents);
//   console.log("stockJson", stockJson);
//   console.log("isAvailable", isAvailable);
//   console.log("images", images);
//   console.log("category", category);
//   console.log("style", style);
//   console.log("sale", sale);
//   console.log("newArrival", newArrival);
//   console.log("topSelling", topSelling);
//   console.log("topSelling", topSelling);
//   console.log("sex", sex);
//   //Parse stock array to be usable here
//   type StockData = { size: string; quantity: number; colorId: number }[];
//   const stockData: StockData = JSON.parse(stockJson as string);

//   // Create roduct in DB without the images.
//   // Image links will be added after the images are uploaded to s3
//   const newProduct = await prisma.product.create({
//     data: {
//       name: name as string,
//       description: description as string,
//       priceInCents: parseInt(priceInCents as string),
//       isAvailable: isAvailable,
//       sale: parseInt(sale as string),
//       details: details as string,
//       newArrival: newArrival,
//       topSelling: topSelling,
//       gender: sex as string,
//       category: {
//         connect: {
//           name: category as string,
//         },
//       },
//       style: {
//         connect: {
//           name: style as string,
//         },
//       },
//       stock: {
//         create: stockData.map((item) => ({
//           size: item.size,
//           quantity: item.quantity,
//           color: {
//             connect: {
//               id: item.colorId,
//             },
//           },
//         })),
//       },
//     },
//   });
//   const newProductId = newProduct.id;

//   // Upload images to s3
//   const imageUrls = [];
//   for (const image of images) {
//     if (!(image instanceof File) || !image.type.startsWith("image/")) {
//       throw new Error("All files must be images");
//     }
//     const arrayBuffer = await image.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);
//     const key = `products/images/${newProductId}/${image.name}`;
//     const imageUrl = await uploadFile(key, buffer, image.type);
//     if (typeof imageUrl === "string") {
//       imageUrls.push(imageUrl);
//     }
//   }
//   await prisma.product.update({
//     where: { id: newProductId },
//     data: {
//       images: {
//         create: imageUrls.map((image) => ({ url: image })),
//       },
//     },
//   });
//   console.log(`Product added: ${name}`);
// }

"use server";

import { Category, Gender, Stock, Style } from "@prisma/client";
import prisma from "./prisma";
import { deleteFile, uploadFile } from "@/app/lib/s3";
import { Color, Image } from "@/app/admin/_components/shared.types";
import { undefined } from "zod";

export async function getAllProducts() {
  const products = await prisma.product.findMany({
    include: {
      images: true,
      category: true,
      style: true,
      gender: true,
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
  isAvailable: boolean;
  topSelling: boolean;
  newArrival: boolean;
  sale: number;
  gender: Gender;
  category: Category;
  style: Style;
  images: Image[];
}) {
  const imagesToUpload: File[] = data.images.reduce((acc: File[], image) => {
    if (image.file) {
      acc.push(image.file);
    }
    return acc;
  }, []);
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
      gender: {
        connect: {
          id: data.gender.id,
        },
      },
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
    include: {
      stock: {
        include: {
          color: true,
        },
      },
    },
  });
  const newProductId = newProduct.id;

  // Upload images to s3
  const imageUrls = [];
  for (const image of imagesToUpload) {
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
  return { ...newProduct };
}

export async function addStock(data: Stock, colorId: number) {
  const newStock = await prisma.stock.create({
    data: {
      size: data.size,
      quantity: data.quantity,
      product: {
        connect: {
          id: data.productId,
        },
      },
      color: {
        connect: {
          id: colorId,
        },
      },
    },
  });
  return newStock;
}

export async function editProduct(
  id: number,
  data: {
    name?: string;
    description?: string;
    details: string;
    stock: {
      id?: number;
      size: string;
      quantity: number;
      color: { name: string; id: number };
      toDelete?: boolean;
      isNew?: boolean;
    }[];
    priceInCents?: number;
    isAvailable?: boolean;
    topSelling: boolean;
    newArrival: boolean;
    sale: number;
    gender: Gender;
    category?: Category;
    style?: Style;
    images?: Image[];
  },
  selectedColor: Color
) {
  // Turn images into files to upload
  const newImages: File[] = (data.images || []).reduce((acc: File[], image) => {
    if (!image.markedForDeletion && image.isNew && image.file instanceof File) {
      acc.push(image.file);
    }
    return acc;
  }, [] as File[]);

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
      images: {
        create: uploadedImages.map((image) => ({ url: image.url })),
      },
      details: data.details,
      sale: data.sale,
      isAvailable: data.isAvailable,
      newArrival: data.newArrival,
      topSelling: data.topSelling,
      gender: {
        connect: {
          id: data.gender.id,
        },
      },
    },
  });

  // Sort stock for the current selected color
  const selectedStock = data.stock.filter(
    (item) => item.color.id === selectedColor.id
  );

  await Promise.all(
    selectedStock.map((item) =>
      prisma.stock.updateMany({
        where: {
          productId: id,
          colorId: item.color.id,
          size: item.size,
        },
        data: {
          quantity: item.quantity,
        },
      })
    )
  );

  // Take new colors and create empty stock for them
  const newColors = data.stock.filter((item) => item.isNew);
  await Promise.all(
    newColors.map(async (item) => {
      try {
        await prisma.stock.create({
          data: {
            size: item.size,
            quantity: item.quantity,
            product: {
              connect: {
                id,
              },
            },
            color: {
              connect: {
                id: item.color.id,
              },
            },
          },
        });
        console.log(
          `Stock created successfully for productId: ${id}, colorId: ${item.color.id}, size: ${item.size}`
        );
      } catch (error) {
        console.error(
          `Error creating stock for productId: ${id}, colorId: ${item.color.id}, size: ${item.size}`,
          error
        );
      }
    })
  );

  // Take colors marked for deletion and delete them
  const colorsToDelete = data.stock.filter((item) => item.toDelete);
  await Promise.all(
    colorsToDelete.map(async (item) => {
      try {
        await prisma.stock.deleteMany({
          where: {
            productId: id,
            colorId: item.color.id,
          },
        });
        console.log(
          `Stock deleted successfully for productId: ${id}, colorId: ${item.color.id}`
        );
      } catch (error) {
        console.error(
          `Error deleting stock for productId: ${id}, colorId: ${item.color.id}`,
          error
        );
      }
    })
  );

  return updatedProduct;
}

// export async function deleteStock(stock: Stock[]) {
//   await prisma.stock.deleteMany({
//     where: {
//       id: {
//         in: stock.map((item) => item.id),
//       },
//     },
//   });
// }

export async function deleteStock(stock: Stock[]) {
  const stockIdentifiers = stock.map((item) => ({
    productId: item.productId,
    colorId: item.colorId,
  }));
  console.log(
    `Attempting to delete stock items with productId and colorId pairs: ${JSON.stringify(
      stockIdentifiers
    )}`
  );

  try {
    // Fetch the records that are about to be deleted
    const recordsToDelete = await prisma.stock.findMany({
      where: {
        OR: stockIdentifiers.map(({ productId, colorId }) => ({
          productId,
          colorId,
        })),
      },
    });

    console.log(
      "Records to be deleted:",
      JSON.stringify(recordsToDelete, null, 2)
    );

    // Perform the deletion
    const result = await prisma.stock.deleteMany({
      where: {
        OR: stockIdentifiers.map(({ productId, colorId }) => ({
          productId,
          colorId,
        })),
      },
    });

    console.log(`Successfully deleted ${result.count} stock items.`);
    console.log("Deleted records:", JSON.stringify(recordsToDelete, null, 2));
  } catch (error) {
    console.error("Error deleting stock items:", error);
  }
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

export async function getGenders() {
  const genders = await prisma.gender.findMany();
  return genders;
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
      gender: true,
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
      gender: true,
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

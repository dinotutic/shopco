"use server";

// Will definitely have to add some error handling here

import { Category, Gender, Stock, Style } from "@prisma/client";
import prisma from "./prisma";
import { deleteFile, uploadFile } from "@/app/lib/s3";
import { Color, Image } from "@/app/types/shared.types";

export async function getAllProducts() {
  const products = await prisma.product.findMany({
    include: {
      images: true,
      category: true,
      style: true,
      gender: true,
      reviews: true,
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
    size: { name: string; id: number };
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
  //  data.stock[0].color because there is always only 1 color when creating a product
  const selectedColor = data.stock[0].color;
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
          size: { connect: { id: item.size.id } },
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
    const key = `products/images/${newProductId}/${selectedColor.name}/${image.name}`;
    const imageUrl = await uploadFile(key, buffer, image.type);
    if (typeof imageUrl === "string") {
      imageUrls.push(imageUrl);
    }
  }
  await prisma.product.update({
    where: { id: newProductId },
    data: {
      images: {
        create: imageUrls.map((image) => ({
          url: image,
          color: { connect: { id: selectedColor.id } },
        })),
      },
    },
  });
  console.log(`Product added: ${data.name}`);
  return { ...newProduct };
}

export async function addStock(data: Stock, colorId: number) {
  const newStock = await prisma.stock.create({
    data: {
      // size: data.size,
      size: { connect: { id: data.sizeId } },
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
      size: { name: string; id: number };
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
      const key = `products/images/${id}/${selectedColor.name}/${image.name}`;
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
        create: uploadedImages.map((image) => ({
          url: image.url,
          color: { connect: { id: selectedColor.id } },
        })),
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
  try {
    await Promise.all(
      selectedStock.map((item) =>
        prisma.stock.updateMany({
          where: {
            productId: id,
            colorId: item.color.id,
            sizeId: item.size.id,
          },
          data: {
            quantity: item.quantity,
          },
        })
      )
    );
    console.log("Stock updated successfully");
  } catch (error) {
    console.error("Error updating stock:", error);
  }

  // Take new colors and create empty stock for them
  const newColors = data.stock.filter((item) => item.isNew);
  await Promise.all(
    newColors.map(async (item) => {
      try {
        await prisma.stock.create({
          data: {
            size: {
              connect: {
                id: item.size.id,
              },
            },
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

export async function getColors() {
  const colors = await prisma.color.findMany();
  return colors;
}

export async function getGenders() {
  const genders = await prisma.gender.findMany();
  return genders;
}
export async function getCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}

export async function getStyles() {
  const styles = await prisma.style.findMany();
  return styles;
}

export async function getColorByColorId(colorId: number) {
  const color = await prisma.color.findUnique({ where: { id: colorId } });
  return color;
}
// Do I need this?
export async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: { include: { color: true } },
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
      images: { where: { colorId: colorId }, include: { color: true } },
      category: true,
      style: true,
      gender: true,
      reviews: true,
      stock: {
        include: {
          color: true,
          size: true,
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
    // If the image is not from s3, do not run "deleteFile" or else it deletes everything
    if (!key.includes("https://loremflickr.com/")) {
      await deleteFile(location);
    }
    await prisma.image.deleteMany({ where: { productId, url: key } });
  } catch (error) {
    throw new Error(`Error deleting image: ${error}`);
  }
}

export async function deleteColorImages(productId: number, colorName: string) {
  const location = `products/images/${productId}/${colorName}`;
  await deleteFile(location);
  await prisma.image.deleteMany({
    where: { productId, color: { name: colorName } },
  });
}

export async function getNewArrivals(limit?: number) {
  const newArrivals = await prisma.product.findMany({
    where: { newArrival: true },
    include: {
      images: true,
      category: true,
      style: true,
      gender: true,
      reviews: {
        include: { user: true },
      },
      stock: {
        include: { color: true, size: true },
      },
    },
    take: limit,
  });
  return newArrivals;
}

export async function getTopSelling(limit?: number) {
  const topSelling = await prisma.product.findMany({
    where: { topSelling: true },
    include: {
      images: true,
      category: true,
      style: true,
      gender: true,
      reviews: true,
      stock: {
        include: { color: true, size: true },
      },
    },
    take: limit,
  });
  return topSelling;
}

export const getFormOptions = async () => {
  const categories = await prisma.category.findMany();
  const styles = await prisma.style.findMany();
  const colors = await prisma.color.findMany();
  const genders = await prisma.gender.findMany();
  const sizes = await prisma.size.findMany();
  return { categories, styles, colors, genders, sizes };
};

export async function getProducts(
  filters: {
    category: string | null;
    style: string | null;
    color: string | null;
    gender: string | null;
    minPrice: number | null;
    maxPrice: number | null;
  },
  take?: number,
  skip?: number
) {
  const { category, style, color, gender, minPrice, maxPrice } = filters;
  const products = await prisma.product.findMany({
    where: {
      category: category ? { name: category } : undefined,
      style: style ? { name: style } : undefined,
      stock: {
        some: {
          color: color ? { name: color } : undefined,
        },
      },
      gender: gender ? { name: gender } : undefined,
      priceInCents: {
        gte: minPrice ? minPrice * 100 : undefined, // Convert to cents
        lte: maxPrice ? maxPrice * 100 : undefined, // Convert to cents
      },
    },
    include: {
      images: true,
      category: true,
      style: true,
      gender: true,
      reviews: true,
      stock: {
        include: { color: true, size: true },
      },
    },
    take,
    skip,
  });
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  return products;
}

export const getSizes = async () => {
  return await prisma.size.findMany();
};

export const getFilters = async () => {
  const categories = await getCategories();
  const styles = await getStyles();
  const colors = await getColors();
  const sizes = await getSizes();
  const price = { min: 0, max: 1000 };
  return { categories, styles, colors, sizes, price };
};

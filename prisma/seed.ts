import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { getColors } from "@/db/productQueries";

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categoryNames = ["t-shirts", "shorts", "shirts", "hoodies", "jeans"];
  const categories = [];
  for (const category of categoryNames) {
    console.log(`Creating category: ${category}`);
    const createdCategory = await prisma.category.create({
      data: {
        name: category,
      },
    });
    categories.push(createdCategory);
  }

  // Create styles
  const styleNames = ["casual", "formal", "party", "gym"];
  const styles = [];
  for (const style of styleNames) {
    console.log(`Creating style: ${style}`);
    const createdStyle = await prisma.style.create({
      data: {
        name: style,
      },
    });
    styles.push(createdStyle);
  }

  // Create sizes
  const availableSizes = ["XS", "S", "M", "L", "XL"];
  const sizes = [];
  for (const size of availableSizes) {
    console.log(`Creating size: ${size}`);
    const createdSize = await prisma.size.create({
      data: {
        name: size,
      },
    });
    sizes.push(createdSize);
  }

  // Create users
  const users = [];
  for (let i = 0; i < 25; i++) {
    console.log(`Creating user ${i + 1}`);
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password(), // In a real application, hash the password
        name: faker.person.fullName(),
      },
    });
    users.push(user);
  }

  // Add Colors
  await prisma.color.createMany({
    data: [
      { name: "black" },
      { name: "white" },
      { name: "red" },
      { name: "blue" },
      { name: "green" },
      { name: "yellow" },
      { name: "orange" },
      { name: "Purple" },
      { name: "pink" },
      { name: "brown" },
      { name: "colorful" },
    ],
  });
  const colorsList = await getColors();

  const getColorIndexes = () => {
    const arrOfIndexes: number[] = [];
    const numberOfColors = Math.round(Math.random() * 3) + 1;
    for (let i = 0; i < numberOfColors; i++) {
      let index = Math.round(Math.random() * 10);
      while (arrOfIndexes.includes(index)) {
        index = Math.round(Math.random() * 10);
      }
      arrOfIndexes.push(index);
    }
    return arrOfIndexes.sort((a, b) => a - b);
  };

  // Create a gender list
  const genderList = [
    { id: 1, name: "men" },
    { id: 2, name: "women" },
    { id: 3, name: "unisex" },
  ];
  for (const gender of genderList) {
    await prisma.gender.create({
      data: gender,
    });
  }

  // Create products
  const products = [];
  for (let i = 0; i < 200; i++) {
    const colorIndexes = getColorIndexes();
    const stockEntries = [];
    const images = [];
    for (const size of availableSizes) {
      for (const colorIndex of colorIndexes) {
        stockEntries.push({
          size: { connect: { name: size } },
          quantity: faker.number.int({ min: 0, max: 30 }),
          color: {
            connect: {
              id: colorsList[colorIndex].id,
            },
          },
        });
      }
    }
    // Create 3 images for each color
    for (const colorIndex of colorIndexes) {
      for (let j = 0; j < 3; j++) {
        images.push({
          url: faker.image.urlLoremFlickr(),
          color: { connect: { id: colorsList[colorIndex].id } },
        });
      }
    }

    console.log(`Creating product ${i + 1}`);
    const product = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        priceInCents: parseInt(faker.commerce.price()) * 100,
        isAvailable: faker.datatype.boolean(),
        category: {
          connect: {
            id: categories[Math.floor(Math.random() * categories.length)].id,
          },
        },
        style: {
          connect: {
            id: styles[Math.floor(Math.random() * styles.length)].id,
          },
        },
        images: { create: images },
        stock: {
          create: stockEntries,
        },
        gender: {
          connect: {
            id: faker.helpers.arrayElement([1, 2, 3]),
          },
        },
        sale: faker.helpers.arrayElement([0, 20, 30]),
        details: faker.lorem.paragraph(),
        newArrival: faker.datatype.boolean(),
        topSelling: faker.datatype.boolean(),
      },
    });
    products.push(product);
  }

  // Create random reviews for each product
  for (const product of products) {
    const reviewCount = faker.number.int({ min: 3, max: 10 });
    for (let i = 0; i < reviewCount; i++) {
      await prisma.review.create({
        data: {
          user: { connect: { id: faker.helpers.arrayElement(users).id } },
          product: { connect: { id: product.id } },
          rating: faker.number.int({ min: 0, max: 5 }),
          comment: faker.datatype.boolean() ? faker.lorem.sentence() : null,
          highlighted: false,
        },
      });
    }
  }

  // Create orders
  for (const user of users) {
    const orderCount = faker.number.int({ min: 3, max: 5 });
    for (let i = 0; i < orderCount; i++) {
      const orderItems = [];
      for (let j = 0; j < faker.number.int({ min: 1, max: 5 }); j++) {
        const product = products[Math.floor(Math.random() * products.length)];
        const color = colorsList[Math.floor(Math.random() * colorsList.length)];
        const size =
          availableSizes[Math.floor(Math.random() * availableSizes.length)];
        orderItems.push({
          quantity: faker.number.int({ min: 1, max: 5 }),
          price: product.priceInCents,
          size: size,
          color: {
            connect: { id: color.id },
          },
          product: {
            connect: { id: product.id },
          },
        });
      }
      console.log(`Creating order ${i + 1} for user ${user.id}`);
      await prisma.order.create({
        data: {
          totalInCents: orderItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ),
          userId: user.id,
          items: {
            create: orderItems,
          },
        },
      });
    }
  }

  console.log(
    "Seeded database with users, products, categories, styles, orders, and reviews"
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// Seeding guide:

//  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
// "prisma": {
//   "seed": "node --loader ts-node/esm prisma/seed.ts"
// },

//______________________________________
// https://github.com/prisma/prisma/discussions/20369

// Comment:
//______________________________________
// Ran:

// npm install tsx --save-dev
// Added

// "prisma": {
// 		"seed": "tsx prisma/seed.ts"
// 	},
// to package.json

// and

// ran the migration steps.

// npx prisma migrate dev --name init

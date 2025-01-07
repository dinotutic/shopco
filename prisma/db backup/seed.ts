import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const availableSizes = ["XS", "S", "M", "L", "XL"];

  // Create categories
  const categoryNames = ["T-shirts", "Shorts", "Shirts", "Hoodies", "Jeans"];
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
  const styleNames = ["Casual", "Formal", "Party", "Gym"];
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

  // Create products
  const products = [];
  for (let i = 0; i < 50; i++) {
    const stockEntries = [];
    for (const size of availableSizes) {
      stockEntries.push({
        size,
        quantity: faker.number.int({ min: 0, max: 30 }),
      });
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
        images: {
          create: [
            { url: faker.image.urlLoremFlickr() },
            { url: faker.image.urlLoremFlickr() },
            { url: faker.image.urlLoremFlickr() },
          ],
        },
        stock: {
          create: stockEntries,
        },
      },
    });
    products.push(product);
  }

  // Create orders
  for (const user of users) {
    const orderCount = faker.number.int({ min: 3, max: 5 });
    for (let i = 0; i < orderCount; i++) {
      const orderItems = [];
      for (let j = 0; j < faker.number.int({ min: 1, max: 5 }); j++) {
        const product = products[Math.floor(Math.random() * products.length)];
        const size =
          availableSizes[Math.floor(Math.random() * availableSizes.length)];
        orderItems.push({
          productId: product.id,
          quantity: faker.number.int({ min: 1, max: 5 }),
          price: product.priceInCents,
          size: size,
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
    "Seeded database with users, products, categories, styles, and orders"
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

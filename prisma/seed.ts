import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categoryNames = ["T-shirts", "Shorts", "Shirts", "Hoodies", "Jeans"];

  const categories = [];
  for (const name of categoryNames) {
    const category = await prisma.category.create({
      data: {
        name,
        description: faker.lorem.sentence(),
      },
    });
    categories.push(category);
  }

  // Create styles
  const styleNames = ["Casual", "Formal", "Party", "Gym"];

  const styles = [];
  for (const name of styleNames) {
    const style = await prisma.style.create({
      data: {
        name,
        description: faker.lorem.sentence(),
      },
    });
    styles.push(style);
  }

  // Create users
  const users = [];
  for (let i = 0; i < 25; i++) {
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
    const product = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        priceInCents: parseInt(faker.commerce.price()) * 100,
        stock: Math.floor(Math.random() * 100),
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
        orderItems.push({
          productId: product.id,
          quantity: faker.number.int({ min: 1, max: 5 }),
          price: product.priceInCents,
        });
      }

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

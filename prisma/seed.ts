import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Create 20 users with random data
  for (let i = 0; i < 20; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password(), // In a real application, hash the password
        name: faker.person.fullName(),
      },
    });

    console.log("Seeded 20 users");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

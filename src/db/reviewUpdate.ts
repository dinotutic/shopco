// import { PrismaClient } from "@prisma/client";
// import { faker } from "@faker-js/faker";

// const prisma = new PrismaClient();

// async function main() {
//   // Fetch all users and products
//   const users = await prisma.user.findMany();
//   const products = await prisma.product.findMany();

//   // Generate reviews
//   for (const user of users) {
//     for (const product of products) {
//       const shouldLeaveReview = faker.datatype.boolean();
//       if (shouldLeaveReview) {
//         const review = {
//           rating: faker.number.int({ min: 1, max: 5 }),
//           comment: faker.lorem.sentence(),
//           userId: user.id,
//           productId: product.id,
//         };
//         console.log(
//           `Creating review for user ${user.id} and product ${product.id}`
//         );
//         await prisma.review.create({
//           data: review,
//         });
//       }
//     }
//   }

//   console.log("Seeding completed");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

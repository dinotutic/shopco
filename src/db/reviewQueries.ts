import prisma from "./prisma";

export const getReviewByUser = (userId: number) => {
  const reviews = prisma.review.findMany({
    where: { userId: userId },
    include: {
      product: true,
      user: true,
    },
  });
  return reviews;
};

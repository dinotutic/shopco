"use server";
import prisma from "./prisma";

export const getReviewByUser = async (userId: number) => {
  const reviews = await prisma.review.findMany({
    where: { userId: userId },
    include: {
      product: true,
      user: true,
    },
  });
  return reviews;
};

export const getAllReviews = async () => {
  return await prisma.review.findMany({
    include: {
      product: true,
      user: true,
    },
  });
};

export const getHighLightedReviews = async () => {
  return await prisma.review.findMany({
    where: { highlighted: true },
  });
};

export const getReviewById = async (reviewId: number) => {
  return await prisma.review.findUnique({
    where: { id: reviewId },
    include: {
      product: true,
      user: true,
    },
  });
};

export const highlightReview = async (
  reviewId: number,
  highlighted: boolean
) => {
  return await prisma.review.update({
    where: { id: reviewId },
    data: { highlighted: !highlighted },
  });
};

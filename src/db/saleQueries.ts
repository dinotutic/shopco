import prisma from "./prisma";

export const getAllSalesasync = async () => {
  const sales = await prisma.order.findMany({
    include: {
      items: true,
      user: true,
    },
  });
  return sales;
};

export const getSaleStats = async () => {
  const data = await prisma.order.aggregate({
    _count: true,
    _sum: { totalInCents: true },
  });
  return {
    ammount: data._sum.totalInCents || 0,
    numberOfOrders: data._count,
  };
};

export const getSaleStatsForUser = async (userId: number) => {
  const data = await prisma.order.aggregate({
    where: { userId },
    _count: true,
    _sum: { totalInCents: true },
  });
  return {
    amount: data._sum.totalInCents || 0,
    numberOfOrders: data._count,
  };
};

export const getPurchasesByUserId = async (userId: number) => {
  const purchases = await prisma.order.findMany({
    where: { userId },
    include: {
      items: true,
    },
  });
  return purchases;
};

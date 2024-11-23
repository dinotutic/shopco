import prisma from "./prisma";

export async function getAllSales() {
  const sales = await prisma.order.findMany({
    include: {
      items: true,
      user: true,
    },
  });
  return sales;
}

export async function getSaleStats() {
  const data = await prisma.order.aggregate({
    _count: true,
    _sum: { totalInCents: true },
  });
  return {
    ammount: data._sum.totalInCents || 0,
    numberOfOrders: data._count,
  };
}

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

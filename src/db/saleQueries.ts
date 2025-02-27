import prisma from "./prisma";

export const getAllSales = async () => {
  const sales = await prisma.order.findMany({
    include: {
      items: {
        include: {
          product: {
            include: {
              category: true,
              style: true,
              images: { include: { color: true } },
              gender: true,
              stock: { include: { color: true } },
              reviews: { include: { user: true } },
            },
          },
          color: true,
        },
      },
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
      items: {
        include: {
          product: {
            include: {
              category: true,
              style: true,
              images: true,
              gender: true,
              reviews: true,
              stock: { include: { color: true } },
            },
          },
          color: true,
        },
      },
      user: true,
    },
  });
  console.log("purchases server", purchases);
  return purchases;
};

export const getOrderById = async (orderId: number) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: {
            include: {
              stock: {
                include: { color: true },
              },
              category: true,
              style: true,
              images: true,
              gender: true,
            },
          },

          color: true,
        },
      },
      user: true,
    },
  });
  return order;
};

export const getTotalItemsInOrder = async (orderId: number) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: true,
    },
  });

  if (!order) {
    throw new Error(`Order with ID ${orderId} not found`);
  }

  const totalItems = order.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return totalItems;
};

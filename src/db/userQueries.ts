import prisma from "./prisma";

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

export async function createUser({ name, email, password }: CreateUserInput) {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  return user;
}

export async function getUserById(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user;
}

export async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function getAllCustomerStats() {
  const [userCount, avgSpentPerUser] = await Promise.all([
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: { totalInCents: true },
    }),
  ]);
  return {
    userCount,
    avgSpentPerUser:
      userCount === 0
        ? 0
        : (avgSpentPerUser._sum.totalInCents || 0) / userCount,
  };
}

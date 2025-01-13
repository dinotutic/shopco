"use server";
import prisma from "./prisma";

type CreateUserInput = {
  name: string;
  email: string;
  password?: string; // was only used for testing. Actual passwords wont be saved this way
};

export async function createCustomer({
  name,
  email,
  password,
}: CreateUserInput) {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  return user;
}

export async function getCustomerById(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user;
}

export async function getAllCustomers() {
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

export async function updateCustomer(userId: number, data: CreateUserInput) {
  const { password, ...updateData } = data;
  const user = await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });
  return user;
}

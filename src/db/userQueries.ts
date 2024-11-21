import prisma from "./prisma";

export async function createUser(
  name: string,
  email: string,
  password: string
) {
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

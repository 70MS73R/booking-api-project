import { PrismaClient } from "@prisma/client";

export default async function getUsersByUsername(username) {
  const prisma = new PrismaClient();
  return prisma.user.findMany({
    where: {
      username: {
        equals: username,
      },
    },
  });
}

import { PrismaClient } from "@prisma/client";

export default async function getUsersByEmail(email) {
  const prisma = new PrismaClient();
  return prisma.user.findMany({
    where: {
      email: {
        equals: email,
      },
    },
  });
}

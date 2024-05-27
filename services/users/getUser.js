import { PrismaClient } from "@prisma/client";

const getUsers = async () => {
  const prisma = new PrismaClient();

  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      reviews: true,
      bookings: true,
    },
  });
  return users;
};

export default getUsers;

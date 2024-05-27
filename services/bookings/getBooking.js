import { PrismaClient } from "@prisma/client";

const getBooking = async () => {
  const prisma = new PrismaClient();

  const booking = await prisma.booking.findMany();
  return booking;
};

export default getBooking;

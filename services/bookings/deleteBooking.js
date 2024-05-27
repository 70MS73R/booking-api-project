import { PrismaClient } from "@prisma/client";
import notFoundError from "../../middleware/notFoundErrorHandler.js";

const deleteBooking = async (id) => {
  const prisma = new PrismaClient();

  const booking = await prisma.booking.findUnique({
    where: {
      id,
    },
  });

  await prisma.booking.delete({
    where: {
      id,
    },
  });

  return id;
};

export default deleteBooking;

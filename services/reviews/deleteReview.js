import { PrismaClient } from "@prisma/client";
import notFoundError from "../../middleware/notFoundErrorHandler.js";

const deleteReview = async (id) => {
  const prisma = new PrismaClient();

  const review = await prisma.review.findUnique({
    where: {
      id,
    },
  });

  await prisma.review.delete({
    where: {
      id,
    },
  });
  return id;
};

export default deleteReview;

import notFoundError from "../../middleware/notFoundErrorHandler.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateReviewById = async (id, rating, comment) => {
  const existingReview = await prisma.review.findUnique({
    where: {
      id,
    },
  });

  const updatedReview = await prisma.review.update({
    where: {
      id,
    },
    data: {
      rating: rating ?? existingReview.rating,
      comment: comment ?? existingReview.comment,
    },
  });

  return updatedReview;
};

export default updateReviewById;

import { PrismaClient } from "@prisma/client";
import notFoundError from "../../middleware/notFoundErrorHandler.js";

const deleteProperty = async (id) => {
  const prisma = new PrismaClient();

  const property = await prisma.property.findUnique({
    where: {
      id,
    },
  });

  await prisma.property.delete({
    where: {
      id,
    },
  });

  return id;
};

export default deleteProperty;

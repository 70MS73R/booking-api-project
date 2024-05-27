import { PrismaClient } from "@prisma/client";
import notFoundError from "../../middleware/notFoundErrorHandler.js";

const prisma = new PrismaClient();

const deleteUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  await prisma.user.delete({
    where: {
      id,
    },
  });

  return id;
};

export default deleteUser;

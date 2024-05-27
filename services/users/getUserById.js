import notFoundError from "../../middleware/notFoundErrorHandler.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};
export default getUserById;

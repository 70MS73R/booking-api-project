import { PrismaClient } from "@prisma/client";
import notFoundError from "../../middleware/notFoundErrorHandler.js";

const deleteHost = async (id) => {
  const prisma = new PrismaClient();

  const host = await prisma.host.findUnique({
    where: {
      id,
    },
  });

  await prisma.host.delete({
    where: {
      id,
    },
  });

  return id;
};

export default deleteHost;

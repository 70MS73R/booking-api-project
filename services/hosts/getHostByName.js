import { PrismaClient } from "@prisma/client";

const getHostByName = async (name) => {
  const prisma = new PrismaClient();
  const hosts = await prisma.host.findMany({
    where: {
      name: {
        contains: name, // Filter hosts whose name contains the specified value
      },
    },
  });
  return hosts;
};

export default getHostByName;

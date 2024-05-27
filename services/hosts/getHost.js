import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getHost = async () => {
  const hosts = await prisma.host.findMany();
  return hosts;
};

export default getHost;

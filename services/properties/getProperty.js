// getProperties.js
import { PrismaClient } from "@prisma/client";

const getProperties = async () => {
  const prisma = new PrismaClient();
  try {
    const properties = await prisma.property.findMany();
    return properties;
  } finally {
    await prisma.$disconnect();
  }
};

export default getProperties;

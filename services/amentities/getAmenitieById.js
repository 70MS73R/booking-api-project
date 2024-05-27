import { PrismaClient } from "@prisma/client";

const getAmenitieById = async (id) => {
  const prisma = new PrismaClient();

  const amenitie = await prisma.amenity.findUnique({
    where: {
      id,
    },
  });
  return amenitie;
};

export default getAmenitieById;

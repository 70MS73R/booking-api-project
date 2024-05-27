import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const createAmenitie = async (name, propertyId) => {
  const prisma = new PrismaClient();

  const newAmenitie = await prisma.amenity.create({
    data: {
      id: uuidv4(),
      name,
      propertyId,
    },
  });
  return newAmenitie;
};

export default createAmenitie;

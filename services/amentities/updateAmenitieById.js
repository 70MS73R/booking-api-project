import notFoundError from "../../middleware/notFoundErrorHandler.js";
import { PrismaClient } from "@prisma/client";

const updateAmenitiesById = async (id, name, propertyId) => {
  const prisma = new PrismaClient();

  const existingAmenity = await prisma.amenity.findUnique({
    where: {
      id,
    },
  });

  const updatedAmenity = await prisma.amenity.update({
    where: {
      id,
    },
    data: {
      name: name ?? existingAmenity.name,
      propertyId: propertyId ?? existingAmenity.propertyId,
    },
  });

  return updatedAmenity;
};

export default updateAmenitiesById;

import notFoundError from "../../middleware/notFoundErrorHandler.js";
import { PrismaClient } from "@prisma/client";

const updatePropertyById = async (
  id,
  hostId,
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  rating,
  amenities
) => {
  const prisma = new PrismaClient();

  const existingProperty = await prisma.property.findUnique({
    where: {
      id,
    },
  });

  const updatedProperty = await prisma.property.update({
    where: {
      id,
    },
    data: {
      title: title ?? existingProperty.title,
      description: description ?? existingProperty.description,
      location: location ?? existingProperty.location,
      pricePerNight: pricePerNight ?? existingProperty.pricePerNight,
      bedroomCount: bedroomCount ?? existingProperty.bedroomCount,
      bathRoomCount: bathRoomCount ?? existingProperty.bathRoomCount,
      maxGuestCount: maxGuestCount ?? existingProperty.maxGuestCount,
      rating: rating ?? existingProperty.rating,
      amenities: amenities ?? existingProperty.amenities,
    },
  });

  return updatedProperty;
};

export default updatePropertyById;

import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const createProperty = async (
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

  const newProperty = await prisma.property.create({
    data: {
      id: uuidv4(),
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      amenities,
    },
  });
  return newProperty;
};

export default createProperty;

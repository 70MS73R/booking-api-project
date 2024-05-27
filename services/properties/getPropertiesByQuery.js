import { PrismaClient } from "@prisma/client";

const getPropertiesByQuery = async ({ location, pricePerNight }) => {
  const prisma = new PrismaClient();
  const properties = await prisma.property.findMany({
    where: {
      // Filter properties by location
      location: {
        contains: location,
      },
      // Filter properties by price per night
      pricePerNight: {
        lte: parseFloat(pricePerNight), // Less than or equal to the specified price
      },
    },
  });

  // Return the fetched properties
  return properties;
};

export default getPropertiesByQuery;

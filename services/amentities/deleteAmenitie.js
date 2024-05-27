import { PrismaClient } from "@prisma/client";

const deleteAmenitie = async (id) => {
  const prisma = new PrismaClient();
  const deletedAmenitie = await prisma.amenity.delete({
    where: {
      id,
    },
  });
  return deletedAmenitie;
};

export default deleteAmenitie;

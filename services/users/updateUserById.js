import notFoundError from "../../middleware/notFoundErrorHandler.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateUserById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      username: username ?? existingUser.username,
      password: password ?? existingUser.password,
      name: name ?? existingUser.name,
      email: email ?? existingUser.email,
      phoneNumber: phoneNumber ?? existingUser.phoneNumber,
      profilePicture: profilePicture ?? existingUser.profilePicture,
    },
  });

  return updatedUser;
};

export default updateUserById;

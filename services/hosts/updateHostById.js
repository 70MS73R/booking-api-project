import notFoundError from "../../middleware/notFoundErrorHandler.js";
import { PrismaClient } from "@prisma/client";

const updateHostById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();

  const existingHost = await prisma.host.findUnique({
    where: {
      id,
    },
  });

  const updatedHost = await prisma.Host.update({
    where: {
      id,
    },
    data: {
      username: username ?? existingHost.username,
      password: password ?? existingHost.password,
      name: name ?? existingHost.name,
      email: email ?? existingHost.email,
      phoneNumber: phoneNumber ?? existingHost.phoneNumber,
      profilePicture: profilePicture ?? existingHost.profilePicture,
      aboutMe: aboutMe ?? existingHost.aboutMe,
    },
  });

  return updatedHost;
};

export default updateHostById;

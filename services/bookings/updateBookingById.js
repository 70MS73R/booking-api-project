import notFoundError from "../../middleware/notFoundErrorHandler.js";
import { PrismaClient } from "@prisma/client";

const updateBookingById = async (
  id,
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const prisma = new PrismaClient();

  const existingBooking = await prisma.booking.findUnique({
    where: {
      id,
    },
  });

  const updatedBooking = await prisma.booking.update({
    where: {
      id,
    },
    data: {
      userId: userId ?? existingBooking.userId,
      propertyId: propertyId ?? existingBooking.propertyId,
      checkinDate: checkinDate ?? existingBooking.checkinDate,
      checkoutDate: checkoutDate ?? existingBooking.checkoutDate,
      numberOfGuests: numberOfGuests ?? existingBooking.numberOfGuests,
      totalPrice: totalPrice ?? existingBooking.totalPrice,
      bookingStatus: bookingStatus ?? existingBooking.bookingStatus,
    },
  });

  return updatedBooking;
};

export default updateBookingById;

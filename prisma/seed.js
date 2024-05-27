import { PrismaClient } from "@prisma/client";
import propertyData from "../src/data/properties.json" assert { type: "json" };
import userData from "../src/data/users.json" assert { type: "json" };
import reviewData from "../src/data/reviews.json" assert { type: "json" };
import bookingData from "../src/data/bookings.json" assert { type: "json" };
import amentitieData from "../src/data/amenities.json" assert { type: "json" };
import hostData from "../src/data/hosts.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { properties } = propertyData;
  const { users } = userData;
  const { reviews } = reviewData;
  const { bookings } = bookingData;
  const { amenities } = amentitieData;
  const { hosts } = hostData;

  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: property,
    });
  }

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: review,
    });
  }

  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: booking,
    });
  }

  for (const amenitie of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenitie.id },
      update: {},
      create: amenitie,
    });
  }

  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

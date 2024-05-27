import express from "express";
import createBooking from "../services/bookings/createBooking.js";
import getBookingById from "../services/bookings/updateBookingById.js";
import getBooking from "../services/bookings/getBooking.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import deleteBookingById from "../services/bookings/deleteBooking.js";
import getBookingsByUserId from "../services/bookings/getBookingsByUserId.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET all bookings or by userId
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    if (userId) {
      const bookings = await getBookingsByUserId(userId);
      res.status(200).json(bookings);
    } else {
      const bookings = await getBooking();
      res.status(200).json(bookings);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve bookings" });
  }
});

// POST a new booking
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;
    const newBooking = await createBooking(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );
    res.status(201).json(newBooking);
  } catch (error) {
    if (error.message.includes("required")) {
      res.status(400).json({ error: "Required fields are missing" });
    } else {
      res.status(400).json({ error: "Failed to create booking" });
    }
  }
});

// GET a booking by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);
    res.status(200).json(booking);
  } catch (error) {
    if (error.message.includes("not found")) {
      res.status(404).json({ error: "Booking not found" });
    } else {
      res.status(404).json({ error: "Failed to retrieve booking" });
    }
  }
});

// PUT update a booking by ID
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;
    const updatedBooking = await updateBookingById(
      id,
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );
    res.status(200).json(updatedBooking);
  } catch (error) {
    if (error.message.includes("not found")) {
      res.status(404).json({ error: "Booking not found" });
    } else {
      res.status(404).json({ error: "Failed to update booking" });
    }
  }
});

// DELETE a booking by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBookingId = await deleteBookingById(id);
    res
      .status(200)
      .json({ message: `Booking with id ${deletedBookingId} was deleted!` });
  } catch (error) {
    if (error.message.includes("not found")) {
      res.status(404).json({ error: "Booking not found" });
    } else {
      res.status(500).json({ error: "Failed to delete booking" });
    }
  }
});

export default router;

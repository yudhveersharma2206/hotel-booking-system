const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/bookingController");
const auth = require("../middleware/authMiddleware");
const Booking = require("../models/Booking");

router.get("/my", auth, async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id })
    .populate({
      path: "hotelId",
      model: "Hotel"
    });

  console.log("Fetched bookings:", bookings);

  res.json(bookings);
});

router.post("/book", auth, createBooking);

router.delete("/cancel/:id", auth, async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: "Booking cancelled" });
});

module.exports = router;
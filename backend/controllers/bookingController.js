const Booking = require("../models/Booking");
const mongoose = require("mongoose");

exports.createBooking = async (req, res) => {
  try {
    const { hotelId, checkIn, checkOut } = req.body;

    console.log("Incoming hotelId:", hotelId);

    const booking = new Booking({
      userId: req.user.id,
      hotelId: new mongoose.Types.ObjectId(hotelId),
      checkIn,
      checkOut
    });

    await booking.save();

    // 🔥 THIS IS IMPORTANT
    const populatedBooking = await booking.populate("hotelId");

    console.log("Saved booking:", populatedBooking);

    res.json(populatedBooking);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
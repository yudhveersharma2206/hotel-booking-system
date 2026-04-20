const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const { hotelId, checkIn, checkOut } = req.body;

    const booking = new Booking({
      userId: req.user.id,
      hotelId,
      checkIn,
      checkOut
    });

    await booking.save();

    res.json({ message: "Booking successful", booking });

  } catch (err) {
    res.status(500).json(err);
  }
};
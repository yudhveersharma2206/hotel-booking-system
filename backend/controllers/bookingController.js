const Booking = require("../models/Booking");

//Create Booking
exports.createBooking = async (req, res) => {
    try {
    const { hotelId, checkIn, checkOut } = req.body;

   //Check availability
    const existing = await Booking.findOne({
    hotelId,
    $or: [
    {
    checkIn: { $lt: new Date(checkOut) },
    checkOut: { $gt: new Date(checkIn) }
    }
    ]
});

    if (existing) {
        return res.status(400).json({
        message: "Room already booked for selected dates"
        });
    }

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
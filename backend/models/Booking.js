const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel"
  },
  checkIn: Date,
  checkOut: Date
});

module.exports = mongoose.model("Booking", bookingSchema);
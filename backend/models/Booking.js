const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: String,
  hotelId: String,
  checkIn: Date,
  checkOut: Date
});

module.exports = mongoose.model("Booking", bookingSchema);
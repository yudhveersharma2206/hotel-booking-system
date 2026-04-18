const Hotel = require("../models/Hotel");

// ➕ Add Hotel (Protected)
exports.addHotel = async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

// 📋 Get All Hotels
exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json(err);
  }
};

// 🔍 Get Single Hotel
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
};
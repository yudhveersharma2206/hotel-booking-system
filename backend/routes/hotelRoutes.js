const express = require("express");
const router = express.Router();
const { addHotel, getHotels, getHotelById } = require("../controllers/hotelController");
const auth = require("../middleware/authMiddleware");

// ➕ Add hotel (login required)
router.post("/add", auth, addHotel);

// 📋 Get all hotels
router.get("/", getHotels);

// 🔍 Get single hotel
router.get("/:id", getHotelById);

module.exports = router;
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookingRoutes = require("./routes/bookingRoutes");
const app = express();

// ✅ pehle middleware
app.use(cors());
app.use(express.json());
app.use("/api/bookings", bookingRoutes);

// ✅ phir routes import
const authRoutes = require("./routes/authRoutes");
const hotelRoutes = require("./routes/hotelRoutes");

// ✅ phir routes use karo
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.listen(5000, () => console.log("Server running on port 5000"));
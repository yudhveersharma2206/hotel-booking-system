const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ pehle middleware
app.use(cors());
app.use(express.json());

// ✅ phir routes import
const authRoutes = require("./routes/authRoutes");
const hotelRoutes = require("./routes/hotelRoutes");

// ✅ phir routes use karo
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);

// DB connect
mongoose.connect("mongodb://127.0.0.1:27017/hotelDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.listen(5000, () => console.log("Server running on port 5000"));
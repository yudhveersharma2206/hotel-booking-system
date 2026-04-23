import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const images = hotel?.images || [];

  // 🔥 Fetch hotel
  useEffect(() => {
    API.get("/hotels")
      .then((res) => {
        const found = res.data.find((h) => h._id === id);
        setHotel(found);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
  if (!images.length) return;

  const interval = setInterval(() => {
    setCurrentImg((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }, 3000); // 3 sec

  return () => clearInterval(interval);
}, [images.length]);

  // 🔥 Booking function
  const handleBooking = async () => {
    if (checkOut <= checkIn) {
      toast.error("Check-out must be after check-in ❌");
      return;
    }
    console.log("Sending hotelId:", hotel?._id);
    setLoading(true);
    console.log("Booking hotelId:", hotel._id);
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/bookings/book",
        {
          hotelId: hotel._id,
          checkIn,
          checkOut,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success("Booking Successful 🎉");
    } catch (err) {
      toast.error("Booking Failed ❌");
    }

    setLoading(false);
  };

  if (!hotel)
    return <p className="text-center mt-10">Loading...</p>;

  return (
  <div className="min-h-screen bg-gray-100 p-6 max-w-6xl mx-auto">

    <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow">

      {/* LEFT: Image */}
      <div>
  {/* MAIN IMAGE */}
  <div className="relative">
            <img
              key={images[currentImg]}
      src={
        images[currentImg] ||
        "https://images.unsplash.com/photo-1566073771259-6a8506099945"
      }
      alt="hotel"
      className="w-full h-80 object-cover rounded-xl transition=all duration-500 ease-in-out"
    />

    {/* LEFT BUTTON */}
    <button
      onClick={() =>
        setCurrentImg((prev) =>
          prev === 0 ? images.length - 1 : prev - 1
        )
      }
      className="absolute left-2 top-1/2 bg-black/50 text-white px-3 py-1 rounded"
    >
      ◀
    </button>

    {/* RIGHT BUTTON */}
    <button
      onClick={() =>
        setCurrentImg((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        )
      }
      className="absolute right-2 top-1/2 bg-black/50 text-white px-3 py-1 rounded"
    >
      ▶
    </button>
  </div>

  {/* THUMBNAILS */}
  <div className="flex gap-2 mt-3">
            {images.map((img, i) => (
              <img
                key={img + i }
        src={img}
        alt="hotel"
      onClick={() => setCurrentImg(i)}
      className={`w-16 h-16 object-cover rounded cursor-pointer transition ${
      currentImg === i
      ? "ring-2 ring-blue-500 scale-105"
      : "opacity-70 hover:opacity-100"
  }`}
/>
    ))}
  </div>
</div>

      {/* RIGHT: Details */}
      <div className="flex flex-col justify-between">

        <div>
          <h2 className="text-3xl font-bold mb-2">
            {hotel.name}
          </h2>

          <p className="text-gray-600 mb-2">
            📍 {hotel.location}
          </p>

          <p className="text-yellow-500 font-medium mb-2">
            ⭐ {hotel.rating} Rating
          </p>

          <p className="text-xl font-semibold text-blue-600 mb-4">
            ₹{hotel.price} / night
          </p>

          <p className="text-gray-700 mb-6">
            {hotel.description}
          </p>
        </div>

        {/* Booking Section */}
        <div className="border-t pt-4">

          <div className="flex gap-4 mb-4">
            <div>
              <p className="text-sm">Check-In</p>
              <DatePicker
                selected={checkIn}
                onChange={(date) => setCheckIn(date)}
                className="border p-2 rounded-lg"
              />
            </div>

            <div>
              <p className="text-sm">Check-Out</p>
              <DatePicker
                selected={checkOut}
                onChange={(date) => setCheckOut(date)}
                className="border p-2 rounded-lg"
              />
            </div>
          </div>

          <button
            onClick={handleBooking}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Booking..." : "Book Now"}
          </button>

        </div>

      </div>
    </div>

  </div>
);
}

export default HotelDetails;
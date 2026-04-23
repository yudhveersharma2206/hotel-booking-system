import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import API from "../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

function Hotels() {
    const [hotels, setHotels] = useState([]);
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());
    const [loadingId, setLoadingId] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  
    useEffect(() => {
    API.get("/hotels")
      .then(res => setHotels(res.data))
      .catch(err => console.log(err));
  }, []);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
  }
}, []);
  // 🔥 BOOK FUNCTION
    const handleBooking = async (hotelId) => {
        
        if (checkOut <= checkIn) {
    alert("Check-out must be after check-in");
    return;
        }
        setLoadingId(hotelId);

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/bookings/book",
        {
          hotelId,
          checkIn,
          checkOut
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

    toast.success("Booking Successful 🎉");

    } catch (err) {
      toast.error("Booking Failed");
        }
        setLoadingId(null);
  };

    return (
  <div className="min-h-screen bg-gray-100 p-6">
    <h2 className="text-3xl font-bold text-center mb-6">
      Hotels
    </h2>

    {/* Date Picker */}
    <div className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-1 focus:ring-blue-500">
      <div>
        <p className="text-sm">Check-In</p>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date)}
          className="border p-2 rounded-lg bg-white text-black"
        />
      </div>

      <div>
        <p className="text-sm">Check-Out</p>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date)}
          className="border p-2 rounded-lg bg-white text-black"
        />
      </div>
    </div>

    {/* Search */}
    <input
      type="text"
      placeholder="Search hotels..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-2 border rounded-lg mb-6"
    />

    {/* Hotels List */}
    <div className="grid md:grid-cols-2 gap-5">
      {hotels
        .filter((hotel) =>
          hotel.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((hotel, index) => (
          <div
            key={hotel._id}
            onClick={() => navigate(`/hotel/${hotel._id}`)}
            className="bg-white p-5 rounded-xl shadow border hover:shadow-md transition space-y-2 cursor-pointer"
          >
            <img
              src={hotel.images[0]}
              alt="hotel"
              className="w-full h-48 object-cover rounded-lg mb-3 hover:scale-105 transition"
            />

            <h3 className="text-xl font-semibold">
              {hotel.name}
            </h3>

            <p className="text-gray-600">
              {hotel.location}
            </p>

            <p className="font-semibold text-lg text-blue-600">
              ₹{hotel.price} / night
            </p>

            <p className="text-sm text-yellow-500 font-medium">
              ⭐ {hotel.rating}
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBooking(hotel._id);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {loadingId === hotel._id ? "Booking..." : "Book Now"}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = "/my-bookings";
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                My Bookings
              </button>
            </div>
          </div>
        ))}
    </div>
  </div>
);
}

export default Hotels;
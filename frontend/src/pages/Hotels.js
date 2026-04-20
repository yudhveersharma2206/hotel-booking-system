import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import API from "../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Hotels() {
    const [hotels, setHotels] = useState([]);
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());
    const [loadingId, setLoadingId] = useState(null);
  const [search, setSearch] = useState("");
  const hotelImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
  "https://images.unsplash.com/photo-1560347876-aeef00ee58a1",
  "https://images.unsplash.com/photo-1535827841776-24afc1e255ac",
  "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1560448075-bb485b067938",
  "https://images.unsplash.com/photo-1540518614846-7eded433c457",
  "https://images.unsplash.com/photo-1568495248636-6432b97bd949",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791"
];
const getRating = () => (Math.random() * 2 + 3).toFixed(1);
  
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
  .filter(hotel =>
    hotel.name.toLowerCase().includes(search.toLowerCase())
  )
  .map((hotel,index) => (
        <div
  key={hotel._id}
  className="bg-white p-5 rounded-xl shadow border hover:shadow-md transition space-y-2"
>
      <img
      src={hotelImages[index % hotelImages.length]}        alt="hotel"
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
          <h3 className="text-xl font-semibold">
            {hotel.name}
          </h3>

          <p className="text-gray-600">
            {hotel.location}
          </p>

          <p className="font-semibold">
              ₹{hotel.price}
      </p>
    <p className="text-sm text-gray-500">
  Rating: {getRating()}
</p>

          <div className="mt-4 flex gap-3">
            <button
  onClick={() => handleBooking(hotel._id)}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
  {loadingId === hotel._id ? "Booking..." : "Book Now"}
</button>

            <button
              onClick={() => window.location.href = "/my-bookings"}
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
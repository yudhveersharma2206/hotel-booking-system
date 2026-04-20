import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import API from "../services/api";

function MyBookings() {
const [bookings, setBookings] = useState([]);

  // 🔹 Fetch bookings
useEffect(() => {
    const token = localStorage.getItem("token");

    API.get("/bookings/my", {
    headers: { Authorization: token }
    })
    .then(res => setBookings(res.data))
    .catch(err => console.log(err));
}, []);

  // 🔹 Cancel booking
const handleCancel = async (id) => {
    const token = localStorage.getItem("token");

    try {
    await API.delete(`/bookings/cancel/${id}`, {
        headers: { Authorization: token }
    });

    toast.success("Booking Cancelled");

      // remove from UI without reload
    setBookings(prev => prev.filter(b => b._id !== id));

    } catch (err) {
    toast.error("Cancel Failed");
    }
};

return (
  <div className="min-h-screen bg-gray-100 p-6 max-w-4xl mx-auto">

    <h2 className="text-3xl font-bold text-center mb-6">
      My Bookings
    </h2>

    {bookings.length === 0 && (
      <p className="text-center text-gray-500">
        No bookings found
      </p>
    )}

    {bookings.map((b) => (
      <div
        key={b._id}
        className="bg-white p-5 rounded-xl shadow border mb-4 flex justify-between items-center"
      >
        {/* LEFT SIDE */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">
            {b.hotelId?.name}
          </h3>

          <p className="text-gray-600">
            {b.hotelId?.location}
          </p>

          <p className="text-sm text-gray-500">
            {new Date(b.checkIn).toDateString()} →{" "}
            {new Date(b.checkOut).toDateString()}
          </p>
        </div>

        {/* RIGHT SIDE */}
        <button
          onClick={() => handleCancel(b._id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Cancel
        </button>
      </div>
    ))}
  </div>
);
}

export default MyBookings;
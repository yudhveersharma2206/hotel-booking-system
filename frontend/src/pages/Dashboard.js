import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import API from "../services/api";

function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    API.get("/bookings/my", {
      headers: { Authorization: token }
    })
      .then(res => setBookings(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🔥 calculations
  const totalBookings = bookings.length;

  const totalSpent = bookings.reduce((sum, b) => {
    return sum + (b.hotelId?.price || 0);
  }, 0);

  const totalNights = bookings.reduce((sum, b) => {
    const days =
      (new Date(b.checkOut) - new Date(b.checkIn)) /
      (1000 * 60 * 60 * 24);
    return sum + days;
  }, 0);

  const chartData = bookings.map((b, i) => ({
    name: `Booking ${i + 1}`,
    price: b.hotelId?.price || 0
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Heading */}
      <h2 className="text-3xl font-bold mb-6 text-center">
        Dashboard
      </h2>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-5 rounded-xl shadow border text-center">
          <h3 className="text-gray-500">Bookings</h3>
          <p className="text-2xl font-bold">{totalBookings}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border text-center">
          <h3 className="text-gray-500">Total Spent</h3>
          <p className="text-2xl font-bold">₹{totalSpent}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border text-center">
          <h3 className="text-gray-500">Nights</h3>
          <p className="text-2xl font-bold">{totalNights}</p>
        </div>

      </div>

      {/* Chart */}
      <div className="bg-white p-5 rounded-xl shadow border mb-8">
        <h3 className="text-lg font-semibold mb-4">
          Spending Overview
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{ borderRadius: "10px", border: "none" }}
              cursor={{ fill: "#f3f4f6" }}
            />
            <Bar dataKey="price" fill="#3b82f6" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white p-5 rounded-xl shadow border">

        <h3 className="text-lg font-semibold mb-4">
          Recent Bookings
        </h3>

        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center">
            No bookings yet
          </p>
        ) : (
          bookings.slice(0, 5).map(b => (
            <div
              key={b._id}
              className="flex justify-between items-center border-b py-2 text-sm"
            >
              <div>
                <p className="font-medium">
                  {b.hotelId?.name}
                </p>
                <p className="text-gray-500">
                  {b.hotelId?.location}
                </p>
              </div>

              <div className="text-right text-gray-500">
                {new Date(b.checkIn).toDateString()}
              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Dashboard;
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Hotels from "./pages/Hotels";
import MyBookings from "./pages/MyBookings";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

function App() {
  return (
    
      <BrowserRouter>
      <Navbar  />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
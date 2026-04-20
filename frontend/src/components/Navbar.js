import React from "react";

function Navbar() {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="bg-white border-b px-6 py-3 flex justify-between items-center sticky top-0 z-50">

      {/* Logo */}
      <h2 className="text-xl font-bold text-blue-600">
        Roomify
      </h2>
      

      {/* Links */}
      <div className="flex gap-6 items-center">

        
        <button
          onClick={() => window.location.href = "/hotels"}
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Hotels
        </button>

        <button
          onClick={() => window.location.href = "/my-bookings"}
          className="text-gray-700 hover:text-blue-600 transition"
        >
          My Bookings
        </button>

        <button
          onClick={() => window.location.href = "/dashboard"}
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Dashboard
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>
      
    </div>
  );
}

export default Navbar;
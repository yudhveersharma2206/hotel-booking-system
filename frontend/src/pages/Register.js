import React, { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);

  if (!emailRegex.test(email)) {
    toast.error("Invalid Email ❌");
    return;
  }

  if (!passwordRegex.test(password)) {
    toast.error(
      "Password must contain uppercase, lowercase, number & special character (min 6 chars)"
      );
      setLoading(false);
    return;
  }

  try {
    await API.post("/auth/register", {
      name,
      email,
      password
    });

    toast.success("Registration Successful 🎉");

    setTimeout(() => {
      window.location.href = "/";
    }, 1500);

  } catch {
      toast.error("Registration Failed");
      setLoading(false);
  }
};

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">

    <div className="bg-white p-8 rounded-xl shadow w-80 border">

      <h2 className="text-2xl font-bold text-center mb-6">
        Create Account
             </h2>
             <p className="text-sm text-gray-500 text-center mb-4">
  Your Perfect Stay, Simplified.
</p>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      {/* 🔐 PASSWORD WITH EYE */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg pr-10 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-black"
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      </div>

      <button
        onClick={handleRegister}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => window.location.href = "/"}
        >
          Login
        </span>
      </p>

    </div>

  </div>
);
}

export default Register;
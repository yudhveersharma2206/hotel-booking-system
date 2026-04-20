import { toast } from "react-toastify";
import React, { useState } from "react";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [showPassword, setShowPassword] = useState(false);

const handleLogin = async () => {
  setLoading(true);
  if (!emailRegex.test(email)) {
    toast.error("Enter valid email ❌");
    return;
  }

  if (!password) {
    toast.error("Password cannot be empty ❌");
    return;
  }

  try {
    const res = await API.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    toast.success("Login Successful");

    setTimeout(() => {
      window.location.href = "/hotels";
    }, 1500);

  } catch {
    toast.error("Invalid credentials ❌");
  }
  setLoading(false);
};

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">

    <div className="bg-white p-8 rounded-xl shadow w-80 border">

      <h2 className="text-3xl font-bold text-center mb-6">
        Login
      </h2>
      <p className="text-sm text-gray-500 text-center mb-4">
        Your Perfect Stay, Simplified.
      </p>

      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
<div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter Password"
    onChange={(e) => setPassword(e.target.value)}
    className="w-full p-3 border rounded-lg pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

  <span
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-black"
  >
    {showPassword ? "🙈" : "👁️"}
  </span>
</div>
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-600 transition"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <p className="text-center mt-4 text-sm">
  New user?{" "}
  <span
    className="text-blue-500 cursor-pointer"
    onClick={() => window.location.href = "/register"}
  >
    Register here
  </span>
</p>

    </div>

  </div>
);
}

export default Login;
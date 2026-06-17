"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function Login() {

  const router = useRouter();

  // Store form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // NEW: password visibility toggle
  const [showPassword, setShowPassword] = useState(false);


  // Loading state
  const [loading, setLoading] = useState(false);

  // Runs when form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Start loading
    setLoading(true);

    // Data to send
    const formData = {
      email,
      password,
    };

    // Send login request
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Response from backend
    const data = await res.json();

    console.log(data);

    // Save logged in user
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
    
localStorage.setItem("user", JSON.stringify(data.user))

    // Stop loading
    setLoading(false);

    // Clear form
    setEmail("");
    setPassword("");

    // Redirect to homepage
window.location.href = "/"  };

  return (
    <div className="flex justify-center items-center min-h-screen">

      <div className="w-full max-w-xl p-10 border rounded-lg shadow-sm">

        <h1 className="text-3xl font-bold text-green-700 text-center">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-4"
        >

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-md placeholder-gray-500 text-gray-800"
          />
  {/* PASSWORD FIELD WITH EYE ICON */}
          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3 rounded-md w-full pr-10 placeholder-gray-500"
            />

            {/* Toggle button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>
          {/* Forgot password link */}
<div className="flex justify-end">
  <a
    href="/forgot-password"
    className="text-sm text-green-600 hover:underline"
  >
    Forgot Password?
  </a>
</div>

          {/* Button */}
          <button className="bg-green-600 text-white py-3 rounded-md">

            {/* Change button text while loading */}
            {loading ? "Logging in..." : "Login"}

          </button>

        </form>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?
          <a href="/signup" className="text-green-600 ml-1">
            Signup
          </a>
        </p>

      </div>
    </div>
  );
}
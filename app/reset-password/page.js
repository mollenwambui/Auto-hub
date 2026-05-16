"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {

  const router = useRouter();

  // Store passwords
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Start loading
    setLoading(true);

    // Send new password to backend
    const res = await fetch("/api/reset-password", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        password,
      }),
    });

    // Convert response
    const data = await res.json();

    console.log(data);

    // Stop loading
    setLoading(false);

    // Clear inputs
    setPassword("");
    setConfirmPassword("");

    // Redirect to login
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">

      <div className="w-full max-w-xl p-10 border rounded-lg shadow-sm">

        <h1 className="text-3xl font-bold text-green-700 text-center">
          Reset Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-4"
        >

          {/* New Password */}
          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3 rounded-md w-full pr-10 placeholder-gray-500"
            />

            {/* Eye toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-3 rounded-md placeholder-gray-500"
          />

          {/* Button */}
          <button className="bg-green-600 text-white py-3 rounded-md">

            {loading ? "Updating..." : "Reset Password"}

          </button>

        </form>

      </div>
    </div>
  );
}
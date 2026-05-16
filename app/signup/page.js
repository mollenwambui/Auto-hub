"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signup() {

  const router = useRouter();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // NEW: password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    console.log(data);

    setLoading(false);

    setName("");
    setEmail("");
    setPassword("");

    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">

      <div className="w-full max-w-xl p-10 border rounded-lg shadow-sm">

        <h1 className="text-3xl font-bold text-green-700 text-center">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-4"
        >

          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-md placeholder-gray-500"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-md placeholder-gray-500"
          />

          {/* PASSWORD FIELD WITH EYE ICON 
          relative means the element stays in its natural spot in the layout, 
          but acts as a reference point
           for any children inside it that are positioned "absolutely.
          */}
          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3 rounded-md w-full pr-10 placeholder-gray-500"
            />

            {/* Toggle button 
            ternary operator- condition ? if value true: if value false
            */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          {/* Signup button */}
          <button className="bg-green-600 text-white py-3 rounded-md">
            {loading ? "Creating account..." : "Signup"}
          </button>

        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?
          <a href="/login" className="text-green-600 ml-1">
            Login
          </a>
        </p>

      </div>
    </div>
  );
}
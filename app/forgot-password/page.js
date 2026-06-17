"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {

  const router = useRouter();

  // Store email
  const [email, setEmail] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Send email to backend
    const res = await fetch("/api/forgot-password", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
      }),
    });

    const data = await res.json();

    console.log(data);

    setLoading(false);

    setEmail("");

    // Redirect to reset password page
// Redirect user to reset password page
//String Interpolation
// We use backticks `` because we are inserting a variable inside the URL
// ${email} gets replaced with the actual email entered by the user
// Normal quotation marks "" would treat ${email} as plain text
router.push(`/reset-password?email=${email}`);  };

  return (
    <div className="flex justify-center items-center min-h-screen">

      <div className="w-full max-w-xl p-10 border rounded-lg shadow-sm">

        <h1 className="text-3xl font-bold text-green-700 text-center">
          Forgot Password
        </h1>

        <p className="text-center text-gray-600 mt-2">
          Enter your email address
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-4"
        >

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-md placeholder-gray-500"
          />

          <button className="bg-green-600 text-white py-3 rounded-md">

            {loading ? "Checking..." : "Continue"}

          </button>

        </form>

      </div>
    </div>
  );
}
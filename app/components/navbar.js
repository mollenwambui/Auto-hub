"use client";

import { useEffect, useState, Fragment } from "react";

export default function Navbar() {

  // Stores logged-in user data
  const [user, setUser] = useState(null);

  // Runs once when Navbar loads
useEffect(() => {
  try {
    const loggedInUser = localStorage.getItem("user");

    if (!loggedInUser || loggedInUser === "undefined") return;

    setUser(JSON.parse(loggedInUser));

  } catch (error) {
    console.log("Invalid user in localStorage");
    localStorage.removeItem("user");
  }
}, []);
  // Function to get first letter of email for avatar
  const getInitial = (email) => {
    return email ? email.charAt(0).toUpperCase() : "?";
  };
    // ADD THIS FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-green-50 border-b border-green-200">

      {/* Logo */}
      <h1 className="text-green-700 text-4xl font-bold">
        AutoHub
      </h1>

      {/* Middle navigation links */}
      <div className="flex gap-8">
        <a href="/" className="text-gray-700 hover:text-green-600">Home</a>
        <a href="/cars" className="text-gray-700 hover:text-green-600">Cars</a>
        <a href="/about" className="text-gray-700 hover:text-green-600">About</a>
        <a href="/contact" className="text-gray-700 hover:text-green-600">Contact</a>
      </div>

      {/* Right side (AUTH AREA) */}
      <div className="flex items-center gap-4">

        {/* React Fragment allows us to return multiple elements without adding extra divs to the DOM */}
        {user ? (
          <Fragment>

            {/* Welcome message */}
            <p className="text-gray-700 font-medium">
              Welcome, {user.name}
            </p>

            {/* User avatar (initial from email) */}
            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
              {getInitial(user.email)}
            </div>
 {/* ADD THIS BUTTON */}
            <button
              onClick={handleLogout}
              className="text-red-600 font-medium hover:text-red-800"
            >
              Logout
            </button>
          </Fragment>
        ) : (
          <Fragment>

            {/* Login link */}
            <a
              href="/login"
              className="text-green-700 font-medium hover:text-green-900"
            >
              Login
            </a>

            {/* Signup button */}
            <a
              href="/signup"
              className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700"
            >
              Signup
            </a>

          </Fragment>
        )}

      </div>

    </nav>
  );
}
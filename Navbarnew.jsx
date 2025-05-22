import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Use named import for jwt-decode
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Navbarnew = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle

  // Decode the token to get user details
  const token = localStorage.getItem("token");
  let userName = null;
  let userRole = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userName = decodedToken.name;
      userRole = decodedToken.role;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const logouthandler = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Show a success toast message
    toast.success("Successfully logged out");

    // Redirect to the homepage
    navigate("/");
  };

  return (
    <nav className="w-full bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-md">
      {/* App Name */}
      <Link to="/" className="text-2xl font-bold tracking-wide text-yellow-400">
        Mind Spark Quiz App<span className="text-blue-400"></span>
      </Link>

      {/* Hamburger Menu for Mobile */}
      <button
        className="lg:hidden text-white focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          ></path>
        </svg>
      </button>

      {/* Navigation Options */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } lg:flex flex-col lg:flex-row lg:items-center lg:space-x-6 text-lg ml-auto pl-4 lg:pl-10`}
      >
        {token ? (
          <>
            <button
              onClick={() => navigate("/profile")}
              className="hover:text-yellow-300 transition duration-300 mb-2 lg:mb-0"
            >
              {userRole === "admin" ? `Admin: ${userName}` : `User: ${userName}`}
            </button>
            <button
              onClick={logouthandler}
              className="hover:text-red-400 transition duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/register"
            className="hover:text-green-300 transition duration-300 font-medium"
          >
            Sign In
          </Link>
        )}
      </div>

      <ToastContainer />
    </nav>
  );
};
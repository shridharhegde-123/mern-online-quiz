import React from "react";
import { Link } from "react-router-dom";

export const Homepage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">
        Welcome to Mind Spark Quiz App
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Test your knowledge and climb the leaderboard!
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Start Quiz
        </Link>
        <Link
          to="/leaderboard"
          className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Leaderboard
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

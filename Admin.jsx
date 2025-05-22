import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUserDataFromBackend } from "../../Redux/action.js";
import { UserdetailForAdmin } from "./UserdetailForAdmin.jsx";

export const Admin = () => {
  const allUsers = useSelector((state) => state.mernQuize.Alluser); // Get user data from Redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addquiz = () => {
    navigate("/addquiz");
  };

  const updateQuiz = () => {
    navigate("/edit-quiz"); // Navigate to the EditQuiz page
  };

  useEffect(() => {
    dispatch(getAllUserDataFromBackend()); // Fetch user data when the component loads
  }, [dispatch]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-8">
      {/* Admin Welcome Section */}
      <div className="bg-gray-100/10 flex flex-col md:flex-row items-center p-6 rounded-lg shadow-lg">
        <div className="md:w-7/12 flex flex-col items-center md:items-start">
          <img
            className="h-32 w-64 rounded-full mb-4 md:ml-8"
            src="./admin.gif"
            alt="Admin"
          />
          <h1 className="text-3xl md:text-4xl font-semibold text-black flex items-center">
            Hi Admin, <span className="text-sky-500 ml-2">admin 👋</span>
          </h1>
          <p className="text-lg text-gray-700 mt-4 text-center md:text-left px-4 md:px-0">
            Welcome to the admin dashboard! Here you can manage quizzes and view user details.
          </p>
        </div>

        {/* Admin Image */}
        <div className="md:w-5/12 flex justify-center md:justify-end mt-6 md:mt-0">
          <img src="./sudhir.jpg" alt="Admin" className="h-60 w-60 md:h-72 md:w-72 rounded-full" />
        </div>
      </div>

      {/* Add Quiz and Update Quiz Buttons */}
      <div className="flex justify-end mt-8 space-x-4">
        <button
          onClick={addquiz}
          className="bg-orange-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-orange-700 transition"
        >
          ADD QUIZ
        </button>
        <button
          onClick={updateQuiz}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          UPDATE QUIZ
        </button>
      </div>

      {/* User Details */}
      <UserdetailForAdmin data={allUsers} />
    </div>
  );
};
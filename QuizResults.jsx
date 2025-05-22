



import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const QuizResults = () => {
  const location = useLocation();
  const { quiz, answers, user } = location.state;
  const [resultsSaved, setResultsSaved] = useState(false); // Flag to track if results are saved
  const saveResultsCalled = useRef(false); // Ref to track if saveResults has been called

  // Calculate the score
  const correctAnswers = quiz.questions.reduce((acc, question, index) => {
    const correctAnswer = question.options.find((opt) => opt.isCorrect)?.text;
    if (answers[index] === correctAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const totalQuestions = quiz.questions.length;
  const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);

  useEffect(() => {
    // Save the results to the database
    const saveResults = async () => {
      try {
        const userName = user?.name || "Default User"; // Provide a default user name if undefined
        const email = user?.email || "default@example.com"; // Provide a default email if undefined
        console.log("Sending data to server:", {
          userId: user.id,
          userName,
          email,
          category: quiz.category,
          totalQuestions,
          correctAnswers,
          percentage,
        });

        await axios.post("http://localhost:4000/quiz/save-results", {
          userId: user.id,
          userName,
          email,
          category: quiz.category,
          totalQuestions,
          correctAnswers,
          percentage,
        });

        console.log("Results saved successfully");
        setResultsSaved(true); // Set the flag to true after saving results
      } catch (error) {
        console.error("Error saving results:", error);
      }
    };

    if (!resultsSaved && !saveResultsCalled.current) {
      saveResultsCalled.current = true; // Set the ref to true to prevent multiple calls
      saveResults();
    }
  }, [quiz.category, totalQuestions, correctAnswers, percentage, user, resultsSaved]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>
        <h2 className="text-xl font-bold mb-4">{quiz.title}</h2>
        <p className="text-gray-600 mb-4">Difficulty: {quiz.difficulty}</p>
        <p className="text-2xl font-bold mb-4">Your Score: {correctAnswers} / {totalQuestions}</p>
        <p className="text-xl font-bold mb-4">Percentage: {percentage}%</p>

        {quiz.questions.map((question, index) => (
          <div key={index} className="mb-8 p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold">
              {index + 1}. {question.title}
            </h3>
            <p>
              <strong>Your Answer:</strong> {answers[index]}
            </p>
            <p>
              <strong>Correct Answer:</strong>{" "}
              {question.options.find((opt) => opt.isCorrect)?.text || "No correct answer available"}
            </p>
          </div>
        ))}
      </div>
      <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
        <p>&copy; 2025 Quiz App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default QuizResults;
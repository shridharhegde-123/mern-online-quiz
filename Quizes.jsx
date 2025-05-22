import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 

export const Quizes = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null); // Dynamic Timer

  // Decode user data from token
  const token = localStorage.getItem("token");
  let userName = null;
  let userId = null;
  let email = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userName = decodedToken.name;
      userId = decodedToken.id;
      email = decodedToken.email;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  // Fetch quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/quiz/${id}`);
        setQuiz(response.data);
        if (response.data.timer) {
          setTimeLeft(response.data.timer * 60); // Convert minutes to seconds
        }
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching quiz data");
      }
    };
    fetchQuiz();
  }, [id]);

  // Timer Effect - Auto-submit when time is up
  useEffect(() => {
    if (timeLeft === null || submitted) return; // Don't start if time is null or already submitted
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit(); // Auto-submit when timer ends
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  // Format Timer (MM:SS)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle option selection
  const handleOptionChange = (questionIndex, optionText) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionText,
    }));
  };

  // Submit Handler
 // Submit Handler (No Mandatory Answer Check)
const handleSubmit = () => {
  setSubmitted(true);
  navigate("/quiz-results", {
    state: {
      quiz,
      answers,
      user: { id: userId, name: userName, email },
    },
  });
};


  if (error) return <p className="text-red-500">{error}</p>;
  if (!quiz) return <p>Loading quiz data...</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>
      <p className="text-gray-600 mb-4">Difficulty: {quiz.difficulty}</p>
      
      {/* Timer Display */}
      {timeLeft !== null ? (
        <h2 className="text-xl font-bold mb-4">Time Left: {formatTime(timeLeft)}</h2>
      ) : (
        <p>Loading timer...</p>
      )}

      <h2 className="text-xl font-bold mb-4">Questions:</h2>
      {quiz.questions && quiz.questions.length > 0 ? (
        quiz.questions.map((question, index) => (
          <div key={index} className="mb-8 p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold">{index + 1}. {question.title}</h3>
            <ul className="mt-4">
              {question.options.map((option, i) => (
                <li key={i} className="text-gray-700">
                  <label>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option.text}
                      checked={answers[index] === option.text}
                      onChange={() => handleOptionChange(index, option.text)}
                      className="mr-2"
                    />
                    {option.text}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No questions available for this quiz.</p>
      )}

      {/* Submit Button */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          className="mt-6 bg-teal-500 text-white px-4 py-2 rounded"
        >
          Submit Quiz
        </button>
      )}
    </div>
  );
};

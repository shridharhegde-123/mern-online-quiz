import React, { useState } from "react";
import axios from "axios";

const AdminAddQuizPage = () => {
  const [quizData, setQuizData] = useState({
    title: "",
    category: "",
    difficulty: "easy",
    timer: "",
    questions: [],
  });

  // Handle input change for quiz details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  // Add a new question (with 4 default options)
  const handleAddQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          title: "",
          options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
        },
      ],
    });
  };

  // Handle question text change
  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index][name] = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  // Handle option text change
  const handleOptionChange = (qIndex, oIndex, e) => {
    const { value } = e.target;
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[qIndex].options[oIndex].text = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  // Handle correct answer selection
  const handleCorrectOptionChange = (qIndex, oIndex) => {
    const updatedQuestions = [...quizData.questions];

    // Ensure only one correct answer per question
    updatedQuestions[qIndex].options.forEach((option, index) => {
      option.isCorrect = index === oIndex;
    });

    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  // Submit quiz data to server
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/admin", quizData); // Updated API
      alert("Quiz added successfully");
      setQuizData({
        title: "",
        category: "",
        difficulty: "easy",
        timer: "",
        questions: [],
      }); // Reset form after successful submission
    } catch (err) {
      console.error("Error adding quiz:", err);
      alert("Error adding quiz");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
        Add New Quiz
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        {/* Quiz Title */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Quiz Title</label>
          <input
            type="text"
            name="title"
            value={quizData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={quizData.category}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter category name"
            required
          />
        </div>

        {/* Difficulty */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Difficulty</label>
          <select
            name="difficulty"
            value={quizData.difficulty}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Timer */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Timer (Minutes)</label>
          <input
            type="number"
            name="timer"
            value={quizData.timer}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter timer in seconds (optional)"
          />
          <small className="text-gray-500">Leave blank for no timer</small>
        </div>

        {/* Questions */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Questions</h3>
          {quizData.questions.map((question, qIndex) => (
            <div key={qIndex} className="mb-4 p-4 bg-gray-100 rounded-lg">
              <div className="mb-2">
                <label className="block font-medium mb-1">Question {qIndex + 1}</label>
                <input
                  type="text"
                  name="title"
                  value={question.title}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>

              {/* Options */}
              <div>
                <h4 className="text-sm font-medium">Options</h4>
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      name="text"
                      value={option.text}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                      required
                    />
                    <input
                      type="radio"
                      checked={option.isCorrect}
                      onChange={() => handleCorrectOptionChange(qIndex, oIndex)}
                      className="w-4 h-4 text-teal-500"
                    />
                    <label className="text-sm">Correct</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddQuestion}
            className="mt-2 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-200"
          >
            + Add Question
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          Save Quiz
        </button>
      </form>
    </div>
  );
};

export default AdminAddQuizPage;
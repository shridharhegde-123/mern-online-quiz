import React, { useState } from "react";
import axios from "axios";

const AdminAddQuizPage = () => {
  // State for quiz details
  const [quizData, setQuizData] = useState({
    title: "",
    category: "",
    difficulty: "easy",  // default
    timer: "",
    questions: [],
  });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData({
      ...quizData,
      [name]: value,
    });
  };

  // Add a new question to the quiz
  const handleAddQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          title: "",
          options: [{ text: "", isCorrect: false }, { text: "", isCorrect: false }],
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

  // Handle options change
  const handleOptionChange = (qIndex, oIndex, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[qIndex].options[oIndex][name] = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  // Handle correct answer selection
  const handleCorrectOptionChange = (qIndex, oIndex) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[qIndex].options.forEach((option, index) => {
      option.isCorrect = index === oIndex;
    });
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  // Submit quiz data to server
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/quizzes", quizData);  // Replace with actual API endpoint
      alert("Quiz added successfully");
    } catch (err) {
      console.error("Error adding quiz:", err);
      alert("Error adding quiz");
    }
  };

  return (
    <div className="admin-add-quiz-container">
      <h2>Add New Quiz</h2>
      <form onSubmit={handleSubmit}>
        {/* Quiz Title */}
        <div>
          <label>Quiz Title</label>
          <input
            type="text"
            name="title"
            value={quizData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label>Category</label>
          <select
            name="category"
            value={quizData.category}
            onChange={handleInputChange}
            required
          >
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            {/* Add more categories */}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label>Difficulty</label>
          <select
            name="difficulty"
            value={quizData.difficulty}
            onChange={handleInputChange}
            required
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Timer */}
        <div>
          <label>Timer (seconds)</label>
          <input
            type="number"
            name="timer"
            value={quizData.timer}
            onChange={handleInputChange}
          />
          <span>Leave blank for no timer</span>
        </div>

        {/* Questions */}
        <div>
          <h3>Questions</h3>
          {quizData.questions.map((question, qIndex) => (
            <div key={qIndex} className="question-section">
              <div>
                <label>Question Text</label>
                <input
                  type="text"
                  name="title"
                  value={question.title}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                  required
                />
              </div>

              {/* Options */}
              <div>
                <h4>Options</h4>
                {question.options.map((option, oIndex) => (
                  <div key={oIndex}>
                    <label>Option {oIndex + 1}</label>
                    <input
                      type="text"
                      name="text"
                      value={option.text}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                      required
                    />
                    <input
                      type="radio"
                      checked={option.isCorrect}
                      onChange={() => handleCorrectOptionChange(qIndex, oIndex)}
                    />
                    <label>Correct</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddQuestion}>
            Add Question
          </button>
        </div>

        <button type="submit">Save Quiz</button>
      </form>
    </div>
  );
};

export default AdminAddQuizPage;

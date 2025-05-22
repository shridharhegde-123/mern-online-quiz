import React, { useState, useEffect } from "react";
import axios from "axios";

export const EditQuiz = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [updatedQuiz, setUpdatedQuiz] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    options: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
  });

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/quiz/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch quizzes by category
  const fetchQuizzes = async (category) => {
    try {
      const response = await axios.get(`http://localhost:4000/quiz/category/${category}`);
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    fetchQuizzes(category);
  };

  // Handle quiz selection
  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
    setUpdatedQuiz(quiz); // Initialize the updated quiz with the selected quiz
  };

  // Handle quiz updates
  const handleQuizChange = (e) => {
    const { name, value } = e.target;
    setUpdatedQuiz((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle question updates
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...updatedQuiz.questions];
    updatedQuestions[index][field] = value;
    setUpdatedQuiz((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  // Handle new question input changes
  const handleNewQuestionChange = (field, value) => {
    setNewQuestion((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNewOptionChange = (index, field, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index][field] = value;
    setNewQuestion((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  // Add new question to the quiz
  const addNewQuestion = () => {
    setUpdatedQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
    // Reset the new question form
    setNewQuestion({
      title: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    });
  };

  // Save the updated quiz
  const saveQuiz = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/quiz/update-quiz/${updatedQuiz._id}`, updatedQuiz);
      alert("Quiz updated successfully!");
      setSelectedQuiz(null); // Reset the selected quiz
      fetchQuizzes(selectedCategory); // Refresh quizzes
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Quiz</h1>

      {/* Category Selection */}
      <div className="mb-6">
        <label className="block mb-2 font-bold">Select Category:</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border rounded w-full"
        >
          <option value="">-- Select a Category --</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Quizzes List */}
      {quizzes.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Quizzes in {selectedCategory}:</h2>
          <ul className="list-disc pl-6">
            {quizzes.map((quiz) => (
              <li key={quiz._id} className="mb-2">
                <button
                  onClick={() => handleQuizSelect(quiz)}
                  className="text-blue-500 underline"
                >
                  {quiz.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Edit Quiz Form */}
      {selectedQuiz && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Edit Quiz: {selectedQuiz.title}</h2>
          <div className="mb-4">
            <label className="block mb-2 font-bold">Quiz Title:</label>
            <input
              type="text"
              name="title"
              value={updatedQuiz.title}
              onChange={handleQuizChange}
              className="p-2 border rounded w-full"
            />
          </div>
            {/* Quiz Timer */}
    <div className="mb-4">
      <label className="block mb-2 font-bold">Quiz Timer (in minutes):</label>
      <input
        type="number"
        name="timer"
        value={updatedQuiz?.timer || 0}
        onChange={handleQuizChange}
        className="p-2 border rounded w-full"
        min="1"
      />
    </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold">Difficulty:</label>
            <select
              name="difficulty"
              value={updatedQuiz.difficulty}
              onChange={handleQuizChange}
              className="p-2 border rounded w-full"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="mb-4">
            <h3 className="font-bold mb-2">Questions:</h3>
            {updatedQuiz.questions.map((question, index) => (
              <div key={index} className="mb-4">
                <label className="block mb-2">Question {index + 1}:</label>
                <input
                  type="text"
                  value={question.title}
                  onChange={(e) =>
                    handleQuestionChange(index, "title", e.target.value)
                  }
                  className="p-2 border rounded w-full"
                />
                <label className="block mt-2">Options:</label>
                {question.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) =>
                        handleQuestionChange(index, `options.${optIndex}.text`, e.target.value)
                      }
                      className="p-2 border rounded w-full mr-2"
                    />
                    <input
                      type="checkbox"
                      checked={option.isCorrect}
                      onChange={(e) =>
                        handleQuestionChange(index, `options.${optIndex}.isCorrect`, e.target.checked)
                      }
                    />
                    <span className="ml-2">Correct</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Add New Question */}
          <div className="mb-6">
            <h3 className="font-bold mb-2">Add New Question:</h3>
            <label className="block mb-2">Question Title:</label>
            <input
              type="text"
              value={newQuestion.title}
              onChange={(e) => handleNewQuestionChange("title", e.target.value)}
              className="p-2 border rounded w-full"
            />
            <label className="block mt-4 mb-2">Options:</label>
            {newQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) =>
                    handleNewOptionChange(index, "text", e.target.value)
                  }
                  className="p-2 border rounded w-full mr-2"
                />
                <input
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={(e) =>
                    handleNewOptionChange(index, "isCorrect", e.target.checked)
                  }
                />
                <span className="ml-2">Correct</span>
              </div>
            ))}
            <button
              onClick={addNewQuestion}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Add Question
            </button>
          </div>

          <button
            onClick={saveQuiz}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Save Quiz
          </button>
        </div>
      )}
    </div>
  );
};
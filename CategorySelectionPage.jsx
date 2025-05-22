import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const CategorySelectionPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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

  // const handleCategorySelect = (category) => {
  //   navigate(`/quizzes/${category}`);
  // };
  const handleCategorySelect = (category) => {
    navigate(`/category/${category}`);
  };
  

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto text-center mt-10 flex-grow">
        <h2 className="text-3xl font-bold mb-6">Choose a Quiz Category</h2>
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategorySelect(category)}
                className="bg-teal-500 text-white py-3 px-8 rounded-lg hover:bg-teal-600 transition duration-200"
              >
                {category}
              </button>
            ))}
          </div>
        ) : (
          <p>Loading categories...</p>
        )}
      </div>
      <footer className="bg-gray-800 text-white text-center p-4 mt-10">
        &copy; 2025 Quiz Application. All rights reserved.
      </footer>
    </div>
  );
};

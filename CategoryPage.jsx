// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// export const CategoryPage = () => {
//   const { category } = useParams();
//   const [quizzes, setQuizzes] = useState([]);
//   const [error, setError] = useState("");

//   console.log("CategoryPage Component Loaded for category:", category);

//   useEffect(() => {
//     console.log("Fetching quizzes for category:", category);
//     axios.get(`http://localhost:4000/quiz/category/${category}`)
//       .then((res) => {
//         console.log("API Response:", res.data);
//         setQuizzes(res.data);
//       })
//       .catch((err) => {
//         console.error("API Error:", err.response?.data?.message || err.message);
//         setError(err.response?.data?.message || "Error fetching quizzes");
//       });
//   }, [category]);

//   console.log("Quizzes Data:", quizzes);
//   if (error) {
//     console.error("Displayed Error:", error);
//   }

//   return (
//     <div className="container mx-auto p-8">
//       <h1 className="text-3xl font-bold mb-6">Quizzes in {category}</h1>
      
//       {error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {quizzes.map((quiz) => (
//             <div key={quiz._id} className="p-6 bg-white shadow-lg rounded-md">
//               <h2 className="text-xl font-bold">{quiz.title}</h2>
//               <p className="text-gray-600">Difficulty: {quiz.difficulty}</p>
//               <Link to={`/quiz/${quiz._id}`}>
//                 <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded">Start Quiz</button>
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export const CategoryPage = () => {
  const { category } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState("");

  console.log("CategoryPage Component Loaded for category:", category);

  useEffect(() => {
    console.log("Fetching quizzes for category:", category);
    axios.get(`http://localhost:4000/quiz/category/${category}`)
      .then((res) => {
        console.log("API Response:", res.data);
        setQuizzes(res.data);
      })
      .catch((err) => {
        console.error("API Error:", err.response?.data?.message || err.message);
        setError(err.response?.data?.message || "Error fetching quizzes");
      });
  }, [category]);

  console.log("Quizzes Data:", quizzes);
  if (error) {
    console.error("Displayed Error:", error);
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Quizzes in {category}</h1>
      
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="p-6 bg-white shadow-lg rounded-md">
              <h2 className="text-xl font-bold">{quiz.title}</h2>
              <p className="text-gray-600">Difficulty: {quiz.difficulty}</p>
              <p className="text-gray-600">Total Questions: {quiz.questions?.length || 0}</p>
              <Link to={`/quiz/${quiz._id}`}>
                <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded">Start Quiz</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


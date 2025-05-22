import React, { useState, useEffect } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [results, setResults] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/quiz/categories");
        console.log("Fetched categories:", response.data); // Debugging
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        console.log("Fetching leaderboard data for category:", category); // Debugging
        const response = await axios.get("http://localhost:4000/quiz/leaderboard", {
          params: { category },
        });
        console.log("Fetched leaderboard data:", response.data); // Debugging

        // Sort results by percentage in descending order
        const sortedResults = response.data.sort((a, b) => b.percentage - a.percentage);
        setResults(sortedResults);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchResults();
  }, [category]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <div className="mb-4">
        <label className="mr-2">Filter by category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Rank</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={result._id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{result.userName || "N/A"}</td> {/* Access userName */}
              <td className="py-2 px-4 border-b">{result.category}</td>
              <td className="py-2 px-4 border-b">{result.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
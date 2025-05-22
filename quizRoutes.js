// const express = require("express");
// const Quiz = require("../model/quizdata.model");
// const Result = require("../model/result.model"); // Import the Result model
// const router = express.Router();

// // Get all distinct categories
// router.get("/categories", async (req, res) => {
//   try {
//     const categories = await Quiz.distinct("category");
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get quizzes by category
// router.get("/category/:category", async (req, res) => {
//   try {
//     const { category } = req.params;
//     const quizzes = await Quiz.find({ category });
//     if (quizzes.length === 0) {
//       return res.status(404).json({ message: "No quizzes found for this category." });
//     }
//     res.status(200).json(quizzes);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching quizzes", error });
//   }
// });

// // Get quiz by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const quiz = await Quiz.findById(req.params.id);
//     if (!quiz) {
//       return res.status(404).json({ message: "Quiz not found" });
//     }
//     res.json(quiz);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching quiz data", error });
//   }
// });

// // Save quiz results
// router.post("/quiz-results", async (req, res) => {
//   try {
//     const { user, category, score } = req.body;
//     const result = new Result({ user, category, score });
//     await result.save();
//     res.status(201).send("Results saved successfully");
//   } catch (error) {
//     res.status(500).send("Error saving results");
//   }
// });

// module.exports = router;
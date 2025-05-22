const express = require("express");
const router = express.Router();
const Quiz = require("../model/quizdata.model");
const Result = require("../model/result.model");

// Get all distinct categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Quiz.distinct("category");
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: error.message });
  }
});


router.get("/leaderboard", async (req, res) => {
  try {
    const { category } = req.query;

    // Filter by category if provided, otherwise fetch all results
    const filter = category ? { category } : {};

    // Fetch results sorted by percentage in descending order
    const results = await Result.find(filter).sort({ percentage: -1 });

    console.log("Leaderboard data being sent:", results); // Debugging
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    res.status(500).send("Error fetching leaderboard data");
  }
});

// Get quizzes by category
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const quizzes = await Quiz.find({ category });
    if (quizzes.length === 0) {
      return res.status(404).json({ message: "No quizzes found for this category." });
    }
    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Error fetching quizzes", error });
  }
});

// Get quiz by ID
router.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    res.status(500).json({ message: "Error fetching quiz data", error });
  }
});

// Save quiz results

router.post("/save-results", async (req, res) => {
  try {
    const {
      userId,
      userName,
      email,
      category,
      totalQuestions,
      correctAnswers,
      percentage,
    } = req.body;

    console.log("Received data from client:", {
      userId,
      userName,
      email,
      category,
      totalQuestions,
      correctAnswers,
      percentage,
    });

    const result = new Result({
      userId,
      userName,
      email,
      category,
      totalQuestions,
      correctAnswers,
      percentage,
    });

    await result.save();
    res.status(201).send("Results saved successfully");
  } catch (error) {
    console.error("Error saving results:", error);
    res.status(500).send("Error saving results");
  }
});


// Update an existing quiz by ID
// Update an existing quiz by ID
router.put("/update-quiz/:id", async (req, res) => {
  try {
    const quizId = req.params.id;
    const updatedQuiz = req.body;

    // Validate timer value (ensure it's positive or null)
    if (updatedQuiz.timer !== null && updatedQuiz.timer < 0) {
      return res.status(400).json({ message: "Invalid timer value" });
    }

    // Find and update the quiz
    const quiz = await Quiz.findByIdAndUpdate(quizId, updatedQuiz, { new: true });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz updated successfully", quiz });
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ message: "Error updating quiz", error });
  }
});


module.exports = router;




// Get quiz results by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const results = await Result.find({ userId: req.params.userId });
    console.log("Fetched Results:", results);

    if (results.length === 0) {
      return res.status(404).json({ message: "No quiz results found for this user." });
    }
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    res.status(500).json({ message: "Error fetching quiz results", error });
  }
});

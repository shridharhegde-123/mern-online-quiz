const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },  // Question text
  options: [
    {
      text: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    }
  ],
});

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },  // Quiz name
    category: { type: String, required: true },  // e.g., "Math", "Science"
    difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
    questions: [questionSchema],
    timer: { type: Number, default: null }, // Time limit in seconds (null for no limit)
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Admin who created the quiz
  },
  { timestamps: true } // Auto-created `createdAt` and `updatedAt`
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;

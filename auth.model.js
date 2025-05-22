const mongoose = require("mongoose");

const quizAttemptedSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true }, // Reference Quiz
  quizResult: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
      selectedOption: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
  score: { type: Number, required: true },
  attemptedAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, index: true }, // Unique & Indexed for faster lookups
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // Role field for role-based access
  Points: { type: Number, default: 0 },
  quizAttempted: [quizAttemptedSchema], // List of quiz attempts with details
});

const User = mongoose.model("User", userSchema);

module.exports = User;
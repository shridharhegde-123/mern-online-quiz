// const mongoose = require("mongoose");

// const resultSchema = new mongoose.Schema({
//   user: { type: String, required: true },
//   category: { type: String, required: true },
//   score: { type: Number, required: true },
//   date: { type: Date, default: Date.now }
// });

// const Result = mongoose.model("Result", resultSchema);

// module.exports = Result;




const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // User ID
  userName: { type: String, required: true }, // User Name
  email: { type: String, required: true }, // User Email
  category: { type: String, required: true }, // Quiz Category
  totalQuestions: { type: Number, required: true }, // Total Questions
  correctAnswers: { type: Number, required: true }, // Total Correct Answers
  percentage: { type: Number, required: true }, // Percentage
  date: { type: Date, default: Date.now }, // Date of Attempt
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
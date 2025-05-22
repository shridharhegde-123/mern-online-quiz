const express = require("express");
const connect = require("./configs/db.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("./model/auth.model.js"); // Import the User model
const app = express();
const Port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication Routes
const loginAuth = require("./controller/auth.controller.js");
app.use("/", loginAuth);

const RegisterAuth = require("./controller/auth.controller.js");
app.use("/", RegisterAuth);

// Admin Routes for Adding Quizzes
const quizAdd = require("./controller/quizAdd.controller.js");
app.use("/admin", quizAdd);

// Quiz Display and User Attempt Routes
const quiz = require("./controller/displayQuiz.controller.js");
app.use("/quiz", quiz);

// User Management Routes
const user = require("./controller/auth.controller.js");
app.use("/user", user);

// User Results Routes
const userResult = require("./controller/userData.controller.js");
app.use("/userResult", userResult);

// New Route for Quiz Categories and Results
const quizResults = require("./controller/quizResults.controller.js");
app.use("/quiz", quizResults);

// Promote User to Admin Route
const userManagement = require("./controller/userData.controller.js");
app.use("/admin", userManagement);

// Function to create the initial admin
const createInitialAdmin = async () => {
  try {
    // Check if an admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("✅ Admin already exists");
      return;
    }

    // Hash the admin password
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    // Create the admin user
    const admin = new User({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin", // Assign the admin role
    });

    await admin.save();
    console.log("✅ Initial admin created successfully");
  } catch (error) {
    console.error("❌ Error creating initial admin:", error.message);
  }
};

// Start Server
app.listen(Port, async function () {
  try {
    await connect();
    console.log(`🚀 Server is running on http://localhost:${Port}`);
    await createInitialAdmin(); // Create the first admin
  } catch (error) {
    console.error("❌ Error connecting to the database:", error.message);
  }
});
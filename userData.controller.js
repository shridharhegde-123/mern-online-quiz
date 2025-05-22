const express = require("express");
const router = express.Router();
const User = require("../model/auth.model.js");



// Delete a user
// router.delete("/user/:id", async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);

//     if (!deletedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting user:", err);
//     res.status(500).json({ message: "Error deleting user", error: err });
//   }
// });

module.exports = router;
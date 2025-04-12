const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

// Register/Login Routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// ✅ Protected Route
router.get("/admin-profile", protect, (req, res) => {
  res.json(req.admin);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { getTopBar, updateTopBar } = require("../controllers/topBarController");
const protect = require("../middleware/authMiddleware");

// Public GET – for frontend display
router.get("/", getTopBar);

// Protected POST – for admin to update
router.post("/", protect, updateTopBar);

module.exports = router;

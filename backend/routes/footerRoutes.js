const express = require("express");
const router = express.Router();
const { getFooter, updateFooter } = require("../controllers/footerController");
const protect = require("../middleware/authMiddleware");

// Public GET
router.get("/", getFooter);

// Admin POST
router.post("/", protect, updateFooter);

module.exports = router;

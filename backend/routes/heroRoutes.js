const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { getHero, updateHero } = require("../controllers/heroController");
const protect = require("../middleware/authMiddleware");

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `hero-${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// Routes
router.get("/", getHero);
router.post("/", protect, upload.single("image"), updateHero);

module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { getAbout, updateAbout } = require("../controllers/aboutController");
const protect = require("../middleware/authMiddleware");

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `about-${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// Routes
router.get("/", getAbout);
router.post("/", protect, upload.single("image"), updateAbout);

module.exports = router;

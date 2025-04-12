const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getFeatures,
  createFeature,
  updateFeature,
  deleteFeature,
} = require("../controllers/featureController");
const protect = require("../middleware/authMiddleware");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `feature-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Routes
router.get("/", getFeatures);
router.post("/", protect, upload.single("icon"), createFeature);
router.put("/:id", protect, upload.single("icon"), updateFeature);
router.delete("/:id", protect, deleteFeature);

module.exports = router;

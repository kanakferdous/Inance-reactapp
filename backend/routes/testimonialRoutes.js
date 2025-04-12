const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getTestimonials,
  updateSectionTitle,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");
const protect = require("../middleware/authMiddleware");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `testimonial-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/png", "image/jpeg", "image/jpg"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PNG and JPG files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Routes
router.get("/", getTestimonials);
router.post("/", protect, updateSectionTitle);
router.post("/item", protect, upload.single("image"), addTestimonial);
router.put("/item/:itemId", protect, upload.single("image"), updateTestimonial);
router.delete("/item/:itemId", protect, deleteTestimonial);

module.exports = router;

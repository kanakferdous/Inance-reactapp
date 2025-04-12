const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { getProfessional, updateProfessional } = require("../controllers/professionalController");
const protect = require("../middleware/authMiddleware");

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, "professional-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    cb("Only .png, .jpg and .jpeg format allowed!");
  }
};

const upload = multer({ storage, fileFilter });

// Routes
router.get("/", getProfessional);
router.post("/", protect, upload.single("image"), updateProfessional);

module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getServiceSection,
  updateServiceSection,
  addServiceItem,
  updateServiceItem,
  deleteServiceItem,
} = require("../controllers/serviceSectionController");

const protect = require("../middleware/authMiddleware");

// Multer setup for PNG/JPG image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `service-${Date.now()}${path.extname(file.originalname)}`);
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

/* ========= Routes ========= */

// Get the full service section
router.get("/", getServiceSection);

// Update section title, button text, button URL
router.post("/", protect, updateServiceSection);

// Add a service item
router.post("/item", protect, upload.single("image"), addServiceItem);

// Update a service item
router.put("/item/:itemId", protect, upload.single("image"), updateServiceItem);

// Delete a service item
router.delete("/item/:itemId", protect, deleteServiceItem);

module.exports = router;

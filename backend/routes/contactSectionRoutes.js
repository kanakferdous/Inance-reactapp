const express = require("express");
const router = express.Router();
const {
  getContactSection,
  updateContactSection,
} = require("../controllers/contactSectionController");
const protect = require("../middleware/authMiddleware");

// Get section title
router.get("/", getContactSection);

// Update/create section title
router.post("/", protect, updateContactSection);

module.exports = router;

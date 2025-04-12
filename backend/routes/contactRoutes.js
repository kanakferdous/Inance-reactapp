const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  createContact,
} = require("../controllers/contactController");
const protect = require("../middleware/authMiddleware");

// GET all submitted messages (admin use only)
router.get("/", protect, getAllContacts);

// POST contact message (frontend form)
router.post("/", createContact);

module.exports = router;

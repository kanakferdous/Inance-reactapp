const express = require("express");
const router = express.Router();
const { getMenuItems, updateMenuItems } = require("../controllers/menuController");
const protect = require("../middleware/authMiddleware");

router.get("/", getMenuItems);
router.post("/", protect, updateMenuItems);

module.exports = router;

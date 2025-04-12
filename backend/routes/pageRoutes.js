const express = require("express");
const router = express.Router();
const {
  getPages,
  getPageBySlug,
  createOrUpdatePage,
  updatePageById,
  deletePage,
} = require("../controllers/pageController");
const protect = require("../middleware/authMiddleware");

router.get("/", protect, getPages);
router.post("/", protect, createOrUpdatePage);
router.put("/:id", protect, updatePageById);
router.get("/:slug", getPageBySlug);
router.delete("/:slug", protect, deletePage);

module.exports = router;

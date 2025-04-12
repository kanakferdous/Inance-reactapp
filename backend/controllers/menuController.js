const MenuItem = require("../models/MenuItem");

// GET all menu items (sorted by order)
exports.getMenuItems = async (req, res) => {
  const items = await MenuItem.find().sort({ order: 1 });
  res.json(items);
};

// POST to update all menu items at once
exports.updateMenuItems = async (req, res) => {
  const updatedItems = req.body;

  try {
    await MenuItem.deleteMany({}); // Clear all
    await MenuItem.insertMany(updatedItems); // Re-insert

    res.json({ message: "Menu updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update menu", error });
  }
};

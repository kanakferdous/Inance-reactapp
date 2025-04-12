const TopBar = require("../models/TopBar");

// GET TopBar info
exports.getTopBar = async (req, res) => {
  try {
    const topbar = await TopBar.findOne();
    res.json(topbar);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch top bar settings" });
  }
};

// UPDATE or CREATE TopBar info
exports.updateTopBar = async (req, res) => {
  const { phone, email } = req.body;

  try {
    let topbar = await TopBar.findOne();
    if (topbar) {
      topbar.phone = phone;
      topbar.email = email;
      await topbar.save();
    } else {
      topbar = await TopBar.create({ phone, email });
    }

    res.json({ message: "Top bar updated successfully", topbar });
  } catch (err) {
    res.status(500).json({ message: "Failed to update top bar", error: err });
  }
};

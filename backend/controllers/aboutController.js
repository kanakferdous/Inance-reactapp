const About = require("../models/About");

// GET About Section
exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch About section", error: err });
  }
};

// CREATE or UPDATE About Section
exports.updateAbout = async (req, res) => {
  const { title, content, buttonText, buttonUrl } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    let about = await About.findOne();

    if (about) {
      about.title = title;
      about.content = content;
      about.buttonText = buttonText;
      about.buttonUrl = buttonUrl;
      if (image) about.image = image;
      await about.save();
    } else {
      about = await About.create({
        title,
        content,
        buttonText,
        buttonUrl,
        image,
      });
    }

    res.json({ message: "About section updated successfully", about });
  } catch (err) {
    res.status(500).json({ message: "Failed to update About section", error: err });
  }
};

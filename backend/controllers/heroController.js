const Hero = require("../models/Hero");

// GET Hero Section Data
exports.getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch hero section", error: err });
  }
};

// UPDATE or CREATE Hero Section Data
exports.updateHero = async (req, res) => {
  const { heading, content, buttonText, buttonUrl } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    let hero = await Hero.findOne();

    if (hero) {
      hero.heading = heading;
      hero.content = content;
      hero.buttonText = buttonText;
      hero.buttonUrl = buttonUrl;
      if (image) hero.image = image;
      await hero.save();
    } else {
      hero = await Hero.create({
        heading,
        content,
        buttonText,
        buttonUrl,
        image,
      });
    }

    res.json({ message: "Hero section updated successfully", hero });
  } catch (err) {
    res.status(500).json({ message: "Failed to update hero section", error: err });
  }
};

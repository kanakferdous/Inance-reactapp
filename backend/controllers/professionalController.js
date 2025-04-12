const Professional = require("../models/ProfessionalSection");

// GET Professional Section Data
exports.getProfessional = async (req, res) => {
  try {
    const data = await Professional.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch professional section", error: err });
  }
};

// CREATE or UPDATE Professional Section Data
exports.updateProfessional = async (req, res) => {
  const { heading, content, buttonText, buttonUrl } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    let data = await Professional.findOne();

    if (data) {
      data.heading = heading;
      data.content = content;
      data.buttonText = buttonText;
      data.buttonUrl = buttonUrl;
      if (image) data.image = image;
      await data.save();
    } else {
      data = await Professional.create({
        heading,
        content,
        buttonText,
        buttonUrl,
        image,
      });
    }

    res.json({ message: "Professional section updated successfully", professional: data });
  } catch (err) {
    res.status(500).json({ message: "Failed to update professional section", error: err });
  }
};

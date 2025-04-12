const Footer = require("../models/Footer");

// GET footer settings
exports.getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    res.json(footer);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch footer data" });
  }
};

// UPDATE or CREATE footer settings
exports.updateFooter = async (req, res) => {
  const { address, phone, email, facebook, twitter, youtube, instagram, copyright } = req.body;

  try {
    let footer = await Footer.findOne();
    if (footer) {
      footer.address = address;
      footer.phone = phone;
      footer.email = email;
      footer.facebook = facebook;
      footer.twitter = twitter;
      footer.youtube = youtube;
      footer.instagram = instagram;
      footer.copyright = copyright;
      await footer.save();
    } else {
      footer = await Footer.create({
        address, phone, email, facebook, twitter, youtube, instagram, copyright
      });
    }

    res.json({ message: "Footer updated successfully", footer });
  } catch (err) {
    res.status(500).json({ message: "Failed to update footer", error: err });
  }
};

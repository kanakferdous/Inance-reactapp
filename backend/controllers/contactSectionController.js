const ContactSection = require("../models/ContactSection");

// GET the contact section info (admin/frontend)
exports.getContactSection = async (req, res) => {
  try {
    const section = await ContactSection.findOne();
    res.json(section);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contact section", error: err });
  }
};

// CREATE or UPDATE the contact section title
exports.updateContactSection = async (req, res) => {
  try {
    const { sectionTitle } = req.body;

    let section = await ContactSection.findOne();
    if (section) {
      section.sectionTitle = sectionTitle;
      await section.save();
    } else {
      section = await ContactSection.create({ sectionTitle });
    }

    res.status(200).json({ message: "Contact section updated", section });
  } catch (err) {
    res.status(500).json({ message: "Failed to update contact section", error: err });
  }
};

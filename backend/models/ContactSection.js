const mongoose = require("mongoose");

const contactSectionSchema = new mongoose.Schema({
  sectionTitle: {
    type: String,
    default: "Contact Us",
  },
});

module.exports = mongoose.model("ContactSection", contactSectionSchema);
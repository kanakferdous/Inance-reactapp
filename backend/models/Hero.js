const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  content: { type: String },
  buttonText: { type: String },
  buttonUrl: { type: String },
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Hero", heroSchema);

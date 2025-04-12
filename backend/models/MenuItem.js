const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url: { type: String, required: true },
  order: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("MenuItem", menuItemSchema);

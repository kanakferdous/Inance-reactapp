const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema({
  address: String,
  phone: String,
  email: String,
  facebook: String,
  twitter: String,
  youtube: String,
  instagram: String,
  copyright: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model("Footer", footerSchema);

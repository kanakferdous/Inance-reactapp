// models/TopBar.js
const mongoose = require("mongoose");

const topBarSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const TopBar = mongoose.model("TopBar", topBarSchema);
module.exports = TopBar;

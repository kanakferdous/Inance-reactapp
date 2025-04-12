const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    icon: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feature", featureSchema);

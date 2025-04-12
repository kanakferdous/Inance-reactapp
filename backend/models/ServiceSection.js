const mongoose = require("mongoose");

const serviceItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const serviceSectionSchema = new mongoose.Schema(
  {
    sectionTitle: { type: String, default: "Our Services" },
    buttonText: { type: String, default: "View More" },
    buttonUrl: { type: String, default: "#" },
    items: [serviceItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceSection", serviceSectionSchema);

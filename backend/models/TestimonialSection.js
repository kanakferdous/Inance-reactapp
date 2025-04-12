const mongoose = require("mongoose");

const testimonialItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: {
      type: Number,
      required: true,
      min: 0.1,
      max: 5,
    },
    image: { type: String },
  },
  { timestamps: true }
);

const testimonialSectionSchema = new mongoose.Schema(
  {
    sectionTitle: {
      type: String,
      default: "What Our Clients Say",
    },
    items: [testimonialItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("TestimonialSection", testimonialSectionSchema);

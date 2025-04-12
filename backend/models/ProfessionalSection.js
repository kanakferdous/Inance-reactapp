const mongoose = require("mongoose");

const professionalSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    buttonUrl: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProfessionalSection", professionalSchema);

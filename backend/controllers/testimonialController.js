const TestimonialSection = require("../models/TestimonialSection");

// GET entire testimonial section
exports.getTestimonials = async (req, res) => {
  try {
    const section = await TestimonialSection.findOne();
    res.json(section);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch testimonials", error: err });
  }
};

// UPDATE section title only
exports.updateSectionTitle = async (req, res) => {
  try {
    const { sectionTitle } = req.body;

    let section = await TestimonialSection.findOne();
    if (section) {
      section.sectionTitle = sectionTitle;
      await section.save();
    } else {
      section = await TestimonialSection.create({ sectionTitle, items: [] });
    }

    res.status(200).json({ message: "Section title updated", section });
  } catch (err) {
    res.status(500).json({ message: "Failed to update section title", error: err });
  }
};

// ADD testimonial item
exports.addTestimonial = async (req, res) => {
  try {
    const { name, comment, rating } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const section = await TestimonialSection.findOne();
    if (!section) return res.status(404).json({ message: "Testimonial section not found" });

    section.items.push({ name, comment, rating, image });
    await section.save();

    res.status(201).json({ message: "Testimonial added", section });
  } catch (err) {
    res.status(500).json({ message: "Failed to add testimonial", error: err });
  }
};

// UPDATE testimonial item
exports.updateTestimonial = async (req, res) => {
  try {
    const { name, comment, rating } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const section = await TestimonialSection.findOne();
    if (!section) return res.status(404).json({ message: "Testimonial section not found" });

    const item = section.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Testimonial not found" });

    item.name = name;
    item.comment = comment;
    item.rating = rating;
    if (image) item.image = image;

    await section.save();
    res.json({ message: "Testimonial updated", item });
  } catch (err) {
    res.status(500).json({ message: "Failed to update testimonial", error: err });
  }
};

// DELETE testimonial item
exports.deleteTestimonial = async (req, res) => {
  try {
    const section = await TestimonialSection.findOne();
    if (!section) return res.status(404).json({ message: "Testimonial section not found" });

    section.items = section.items.filter(item => item._id.toString() !== req.params.itemId);
    await section.save();

    res.json({ message: "Testimonial deleted", section });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete testimonial", error: err });
  }
};

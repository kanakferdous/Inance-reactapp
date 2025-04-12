const ServiceSection = require("../models/ServiceSection");

// GET entire service section
exports.getServiceSection = async (req, res) => {
  try {
    const section = await ServiceSection.findOne();
    res.json(section);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch service section", error: err });
  }
};

// UPDATE or CREATE service section (section title, button text + url)
exports.updateServiceSection = async (req, res) => {
  try {
    const { sectionTitle, buttonText, buttonUrl } = req.body;

    let section = await ServiceSection.findOne();

    if (section) {
      section.sectionTitle = sectionTitle;
      section.buttonText = buttonText;
      section.buttonUrl = buttonUrl;
      await section.save();
    } else {
      section = await ServiceSection.create({
        sectionTitle,
        buttonText,
        buttonUrl,
        items: [],
      });
    }

    res.status(200).json({ message: "Section updated", section });
  } catch (err) {
    res.status(500).json({ message: "Failed to update section", error: err });
  }
};

// ADD a new service item
exports.addServiceItem = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const section = await ServiceSection.findOne();
    if (!section) return res.status(404).json({ message: "Service section not found" });

    section.items.push({ title, description, image });
    await section.save();

    res.status(201).json({ message: "Service item added", section });
  } catch (err) {
    res.status(500).json({ message: "Failed to add item", error: err });
  }
};

// UPDATE a service item
exports.updateServiceItem = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const section = await ServiceSection.findOne();
    if (!section) return res.status(404).json({ message: "Service section not found" });

    const item = section.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Service item not found" });

    item.title = title;
    item.description = description;
    if (image) item.image = image;

    await section.save();
    res.json({ message: "Service item updated", item });
  } catch (err) {
    res.status(500).json({ message: "Failed to update item", error: err });
  }
};

// DELETE a service item
exports.deleteServiceItem = async (req, res) => {
  try {
    const section = await ServiceSection.findOne();
    if (!section) return res.status(404).json({ message: "Service section not found" });

    section.items = section.items.filter(item => item._id.toString() !== req.params.itemId);
    await section.save();

    res.json({ message: "Service item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete item", error: err });
  }
};

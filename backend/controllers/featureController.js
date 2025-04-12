const Feature = require("../models/Feature");

// GET All
exports.getFeatures = async (req, res) => {
  try {
    const features = await Feature.find();
    res.json(features);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch features" });
  }
};

// CREATE
exports.createFeature = async (req, res) => {
  try {
    const { title } = req.body;
    const icon = req.file ? `/uploads/${req.file.filename}` : "";

    const newFeature = await Feature.create({ title, icon });

    res.status(201).json({ feature: newFeature });
  } catch (err) {
    res.status(500).json({ message: "Failed to create feature", error: err });
  }
};

// UPDATE
exports.updateFeature = async (req, res) => {
  try {
    const { title } = req.body;
    const icon = req.file ? `/uploads/${req.file.filename}` : null;

    let feature = await Feature.findById(req.params.id);
    if (!feature) return res.status(404).json({ message: "Feature not found" });

    feature.title = title;
    if (icon) feature.icon = icon;
    await feature.save();

    res.status(200).json({ feature });
  } catch (err) {
    res.status(500).json({ message: "Failed to update feature", error: err });
  }
};

// DELETE
exports.deleteFeature = async (req, res) => {
  try {
    await Feature.findByIdAndDelete(req.params.id);
    res.json({ message: "Feature deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete feature", error: err });
  }
};

const Page = require("../models/Page");

// GET all pages (Admin)
exports.getPages = async (req, res) => {
  try {
    const pages = await Page.find();
    res.json(pages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pages" });
  }
};

// GET page by slug (Public)
exports.getPageBySlug = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    if (!page) return res.status(404).json({ message: "Page not found" });
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch page" });
  }
};

// CREATE or UPDATE page by slug (Admin)
exports.createOrUpdatePage = async (req, res) => {
  const { title, slug, content } = req.body;

  try {
    let page = await Page.findOne({ slug });

    if (page) {
      page.title = title;
      page.content = content;
      await page.save();
    } else {
      page = await Page.create({ title, slug, content });
    }

    res.json({ message: "Page saved successfully", page });
  } catch (err) {
    res.status(500).json({ message: "Failed to save page", error: err });
  }
};

// UPDATE page by ID (Admin)
exports.updatePageById = async (req, res) => {
  const { title, slug, content } = req.body;

  try {
    const updatedPage = await Page.findByIdAndUpdate(
      req.params.id,
      { title, slug, content },
      { new: true }
    );

    if (!updatedPage) {
      return res.status(404).json({ message: "Page not found" });
    }

    res.json({ message: "Page updated successfully", page: updatedPage });
  } catch (err) {
    res.status(500).json({ message: "Failed to update page", error: err });
  }
};

// DELETE page by slug
exports.deletePage = async (req, res) => {
  try {
    const deleted = await Page.findOneAndDelete({ slug: req.params.slug });
    if (!deleted) {
      return res.status(404).json({ message: "Page not found" });
    }
    res.json({ message: "Page deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete page", error: err });
  }
};

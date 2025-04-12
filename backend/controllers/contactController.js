const Contact = require("../models/Contact");

// GET all submitted contacts (for admin view)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contact submissions", error: err });
  }
};

// CREATE contact submission (from frontend)
exports.createContact = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // Basic validation
    if (!name || !phone || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save to database
    const newContact = await Contact.create({ name, phone, email, message });

    // TODO: Send email to admin (optional step)
    
    res.status(201).json({ message: "Message submitted successfully", contact: newContact });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit message", error: err });
  }
};

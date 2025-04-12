const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Route imports
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const topBarRoutes = require("./routes/topBarRoutes");
const footerRoutes = require("./routes/footerRoutes");
const heroRoutes = require("./routes/heroRoutes");
const pageRoutes = require("./routes/pageRoutes");
const featureRoutes = require("./routes/featureRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const professionalRoutes = require("./routes/professionalRoutes");
const serviceSectionRoutes = require("./routes/serviceSectionRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const contactSectionRoutes = require("./routes/contactSectionRoutes");
const contactRoutes = require("./routes/contactRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Serve static files (e.g., uploaded SVGs)
app.use("/uploads", express.static("uploads"));

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/topbar", topBarRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/feature", featureRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/professional", professionalRoutes);
app.use("/api/service-section", serviceSectionRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/contact-section", contactSectionRoutes);
app.use("/api/contacts", contactRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

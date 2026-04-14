const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://mohsinkhan292003_db_user:mk290703khan@clustermk.7o03opm.mongodb.net/leads")
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch(err => console.error("❌ DB error:", err));

// ✅ Model
const Lead = mongoose.model("Lead", {
  email: String,
});

// ✅ Route
app.post("/api/lead", async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email" });
  }

  try {
    await Lead.create({ email });
    console.log("Saved:", email);

    res.json({ message: "Saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Start server
app.listen(5000, () => console.log("Server running on port 5000"));

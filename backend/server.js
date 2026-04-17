const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

/* =========================
   🔗 CONNECT TO MONGODB
========================= */

mongoose.connect("mongodb+srv://admin:tabby210@cluster0.prfmly3.mongodb.net/feedbackDB?appName=Cluster0")
  .then(() => console.log("MongoDB connected 💙"))
  .catch((err) => console.log(err));

  

/* =========================
   🧱 SCHEMA + MODEL
========================= */

const FeedbackSchema = new mongoose.Schema({
  email: String,
  customer: String,
  region: [String],
  product: String,
  feedbackType: String,
  description: String,
  impact: String,
  urgency: Number,
  affectedCustomers: String,
  suggestion: String,
  benefit: String,
  additional: String,
  status: { type: String, default: "Open" },
  assignedTo: { type: String, default: null }
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", FeedbackSchema);

/* =========================
   🚀 ROUTES
========================= */

// 👉 TEST
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// 👉 CREATE FEEDBACK
app.post("/feedback", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();

    res.json({ message: "Saved successfully", data: feedback });
  } catch (error) {
    res.status(500).json({ error: "Error saving feedback" });
  }
});

// 👉 GET ALL
app.get("/feedback", async (req, res) => {
  try {
    const data = await Feedback.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

// 👉 UPDATE STATUS
app.put("/feedback/:id", async (req, res) => {
  try {
    await Feedback.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    });

    res.json({ message: "Status updated" });
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

// 👉 ASSIGN
app.put("/feedback/:id/assign", async (req, res) => {
  try {
    await Feedback.findByIdAndUpdate(req.params.id, {
      assignedTo: req.body.assignedTo
    });

    res.json({ message: "Assigned successfully" });
  } catch (error) {
    res.status(500).json({ error: "Assignment failed" });
  }
});

/* =========================
   ▶️ START SERVER
========================= */

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
require("dotenv").config();
console.log("MONGO_URI FROM ENV:",
process.env.MONGO_URI)
const express    = require("express");
const cors       = require("cors");
const connectDB  = require("./db");
const contactRoute = require("./contactRoute");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Connect to MongoDB ──
connectDB();

// ── Middleware ──
app.use(cors({
  origin: "https://future-fs-01-brown.vercel.app", // your React Vite dev server
  methods: ["GET", "POST"],
}));
app.use(express.json());

// ── Routes ──
app.get("/", (req, res) => {
  res.json({ message: "🚀 Portfolio backend is running!" });
});

app.use("/api/contact", contactRoute);

// ── Start server ──
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

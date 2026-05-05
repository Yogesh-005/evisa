const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const config = require("./config/env");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({ origin: config.clientOrigin, credentials: true }));
app.use(express.json({ limit: "5mb" }));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);

app.use((_req, res) => res.status(404).json({ success: false, message: "Not Found" }));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message || "Server Error" });
});

async function start() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("MongoDB connected");
    app.listen(config.port, () => {
      console.log(`API listening on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();

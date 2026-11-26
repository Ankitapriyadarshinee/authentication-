require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initDb } = require("./src/config/db");
const authRoutes = require("./src/routes/auth.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ service: "auth-service", status: "ok" }));

app.get("/", (req, res) =>
  res.json({
    message: "Auth service is running 🚀",
    routes: ["POST /signup", "POST /login", "GET /profile (Bearer token)"],
  })
);

app.use("/", authRoutes);

const PORT = process.env.PORT || 5000;

initDb()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 auth-service running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  });
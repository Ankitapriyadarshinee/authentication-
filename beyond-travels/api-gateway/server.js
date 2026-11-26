require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const AUTH_URL = process.env.AUTH_SERVICE_URL || "http://127.0.0.1:5000";

// ---------- Frontend serve ----------
app.use(express.static(path.join(__dirname, "..", "frontend")));

app.get("/health", (req, res) =>
  res.json({ service: "api-gateway", version: "v3-fetch", status: "ok" })
);

// ---------- /api/auth/* -> auth-service ----------
app.all("/api/auth/*", async (req, res) => {
  const target = req.params[0]; // signup / login / profile / health
  const url = `${AUTH_URL}/${target}`;

  const headers = { "Content-Type": "application/json" };
  if (req.headers.authorization) headers.Authorization = req.headers.authorization;

  const options = { method: req.method, headers };
  if (!["GET", "HEAD"].includes(req.method)) {
    options.body = JSON.stringify(req.body || {});
  }

  try {
    const r = await fetch(url, options);
    const text = await r.text();
    res.status(r.status).type("application/json").send(text);
  } catch (err) {
    const reason = (err.cause && err.cause.code) || err.message;
    console.error("GATEWAY ERROR ->", url, "|", reason);
    res.status(502).json({
      success: false,
      message: "Gateway cannot reach auth-service",
      reason,
    });
  }
});

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`🚀 api-gateway v3 running on http://localhost:${PORT}`));
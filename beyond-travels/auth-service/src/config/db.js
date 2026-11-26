const { Pool } = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");
const schema = require("../db/schema");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
  max: 10,
  connectionTimeoutMillis: 20000,
});

pool.on("error", (err) => console.error("PG pool error:", err.message));

const db = drizzle(pool, { schema });

async function initDb() {
  await pool.query("SELECT 1"); // connection test
  console.log("✅ PostgreSQL (Supabase) connected via Drizzle");
}

module.exports = { db, initDb };
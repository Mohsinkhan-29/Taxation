import pkg from "pg";

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Without this handler, an error on an idle pooled client (dropped connection,
// DB restart, network blip, etc.) is treated as an uncaught exception and
// crashes the whole process. This just logs it and lets the pool recover.
pool.on("error", (err) => {
  console.error("❌ Unexpected PG pool error (idle client):", err);
});

export const connectDB = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("✅ PostgreSQL Connected");
  } catch (err) {
    console.error("❌ DB Error:", err);
  }
};

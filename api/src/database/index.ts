import "dotenv/config";
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", (client) => {
  console.log("✅ Database connected");
});

pool.on("error", (err) => {
  console.error("❌ Database error", err);
  process.exit(-1);
});
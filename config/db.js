import "dotenv/config";
import pg from "pg";

const db = new pg.Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export async function connectDatabase() {
  await db.connect();
  console.log("Connected to PotgreSQL");
}

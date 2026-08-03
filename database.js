import "dotenv/config";
import pg from "pg";

const db = new pg.Client({
  host: process.env.DB_HOST,
  database: process.env.POSTGRES_DB,
  port: process.env.DB_PORT,
  user: process.env.POSTGRES_USER,
  password: String( process.env.POSTGRES_PASSWORD ),
});

db.connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Database connection error", err.stack));

export default db;

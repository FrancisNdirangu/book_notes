import pg from "pg";

const db = new pg.Client({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

db.connect();

db.on("error", (error) => {
  console.error("unable to establish connection to database", error);
});

export default db;

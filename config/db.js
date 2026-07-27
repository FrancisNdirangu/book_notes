import "dotenv/config";
import pg from "pg";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

export const db = new pg.Client({
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

export async function disconnectDatabase() {
  await db.end();
  console.log("Disconnected from PostgreSQL");
}

//Create a client connected to the application's database
export function createAppDatabaseClient() {
  return new pg.Client(dbConfig);
}

//Creates a client connected to PostgreSQL's maintenance database.
// This connection is for checking whether the application db exists when creating it.
export function createAdminDatabaseClient() {
  return new pg.Client({ ...dbConfig, database: process.env.DB_ADMIN_DATABASE ?? 'postgres' });

  }

export default db;

import "dotenv/config";

import {ensureDatabaseExists,runMigrations,} from "./bootstrap.js";

async function setupDatabase() {
  try {
    console.log("Starting database setup...");

    await ensureDatabaseExists();
    await runMigrations();

    console.log("Database setup completed successfully.");

  } catch (error) {
    console.error("Database setup failed.");
    console.error(error);

    process.exitCode = 1;
  }
}
await setupDatabase();


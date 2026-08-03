import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createAdminDatabaseClient,createAppDatabaseClient } from "../../config/db.js";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);

const migrationsDirectory = path.join(currentDirectory, "migrations");

/**
 * Postgres $1 parameters cant represent identifiers like database names.
 * So I'll validate the database name before we insert it into the create database statement */

function validateDatabaseName(databaseName) {
  const validateDatabaseName = /^[a-zA-z_][a-zA-Z0-9_]*$/;

  if (!validateDatabaseName.test(databaseName)) {
    throw new Error(
      `Invalid database name: "${databaseName}".` +
      "Use only letters, numbers, and underscores."
    );
    ;
    
  }
};

/** 
  * Check whether the application database exists.
  * Create it if its missing
  */
export async function ensureDatabaseExists() {
  const databaseName = process.env.DB_NAME;

  if(!databaseName) {
    throw new Error("DB_NAME has not been provided");
  }

  validateDatabaseName(databaseName);

  const adminClient = createAdminDatabaseClient();

  try{
    await adminClient.connect();
    
    const result = await adminClient.query(`SELECT 1 FROM pg_database WHERE datname=$1`,[databaseName]);

    if (result.rowCount > 0) {
      console.log(`Database "${databaseName}" already exists.`);
      return;
    }
    try {
      await adminClient.query(`CREATE DATABASE "${databaseName}"`);

    } catch (error) {
      /*
        * Posgresql error 42P04 means duplicate_database.
        * This might happen if two setup processes check at almost at the same time and both try to create the database
        */
        if (error.code === "42P04") {
          console.log(`Database "${databaseName}" was created by another process.`);
          return;
        }

      throw error;
    }} finally {
      await adminClient.end().catch(() => {});
    }
  }


async function ensureMigrationTrackingTable(client) {
  await client.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    migration_name VARCHAR(255) NOT NULL UNIQUE,
    executed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP)`); }



async function getAppliedMigrations(client) {
  const result = await client.query(`SELECT migration_name FROM schema_migrations ORDER BY migration_name`);
  return new Set(
    result.rows.map((row) => row.migration_name));
}

/**
  * Runs every migration that has not already been applied.
  */
export async function runMigrations() {
  const client = createAppDatabaseClient();

  try {
    await client.connect();

    await ensureMigrationTrackingTable(client);

    const appliedMigrations = await getAppliedMigrations(client);

    const migrationFiles = (
      await fs.readdir(migrationsDirectory)
    ).filter((fileName) => fileName.endsWith(".sql")).sort();

    for (const migrationFile of migrationFiles) {
      if (appliedMigrations.has(migrationFile)){
        console.log(`Skipping ${migrationFile}`);
        continue;
      }

      const migrationPath = path.join(migrationsDirectory,migrationFile);

      const sql = await fs.readFile(migrationPath,"utf8");

      console.log(`Running ${migrationFile}`);

      try {
        await client.query("BEGIN");

        await client.query(sql);

        await client.query(`
          INSERT INTO schema_migrations (migration_name)
          VALUES ($1) `, [migrationFile]);

        await client.query("COMMIT");

        console.log(`Completed ${migrationFile}`);

      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      }
    }

    console.log("All database migrations are up to date.");

  } finally {
  await client.end().catch(() => {});
}

} 


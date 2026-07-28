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
}

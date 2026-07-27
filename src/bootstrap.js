import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createAdminDatabaseClient,createAppDatabaseClient } from "../../config/db.js";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);

const migrationsDirectory = path.join(currentDirectory, "migrations");

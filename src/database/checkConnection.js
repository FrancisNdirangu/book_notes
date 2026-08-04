import { createAppDatabaseClient} from "../../config/db.js"

export async function verifyDatabaseConnection() {
  const client = createAppDatabaseClient();

  try{
    await client.connect();

    const result = await client.query(`SELECT current_database() AS database_name,
                                        CURRENT_TIMESTAMP AS connected_at`);

    console.log(`Connected to database ${result.rows[0].database_name}`);

  } finally {
    await client.end().catch(() => {});
  }
}

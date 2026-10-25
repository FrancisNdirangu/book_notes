import db from"../config/db.js";

export async function transactionHelper(callback) {

  const client = await db.connect();

  try {
    await client.query('BEGIN');

    const response = callback(client);

    await client.query('COMMIT');

    return response;
  } catch (error) {

    await client.query('ROLLBACK');

    throw error;

  } finally {
    await client.release();
  }

}

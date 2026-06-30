import db from "../database.js";

export const viewBookNotes = async () => {
  const bookRecords = await db.query("SELECT * FROM book_notes");
};

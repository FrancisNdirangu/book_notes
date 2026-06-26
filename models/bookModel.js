import db from "../database";

export const viewBookNotes = async () => {
  const bookRecords = await db.query("SELECT * FROM book_notes");
};

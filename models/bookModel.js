import db from "../config/db.js";

export class bookModel {
  static async viewAllBooks() {
    const bookRecords = await db.query("SELECT * FROM book_notes");
  }

  static async addBook(title, notes, date_read) {
    const query = `INSERT INTO book_notes (title,notes,date_read)
      VALUES = ($1,$2,$3)`;

    const result = await db.query(query, [title, notes, date_read]);

    return result.rows;
  }

  static async viewSpecificBook(id) {
    const query = `SELECT * FROM book_notes WHERE id = $1`;

    const result = await db.query(query, [id]);

    return result.rows;
  }

  static async editSpecificBook(id, book_notes, rating, date_read) {
    const query = `UPDATE book_notes
      SET notes=$2,date_read=$3,rating=$4
      WHERE id=$1`;

    const result = await db.query(query, [id, book_notes, date_read, rating]);

    return result.rows;
  }

  static async deleteBook(id) {
    const query = `DELETE FROM book_notes WHERE id = $1`;

    const result = await db.query(query, [id]);

    return result.rows;
  }
}

import db from "../config/db.js";

export class bookModel {
  static async viewAllBooks() {
    const bookRecords = await db.query("SELECT * FROM book_notes");

    return bookRecords.rows;
  }

  static async addBook(title, notes, date_read, rating) {
    const query = `INSERT INTO book_notes (title,notes,date_read,rating)
      VALUES = ($1,$2,$3)`;

    const result = await db.query(query, [title, notes, date_read, rating]);

    return result.rows;
  }

  static async viewSpecificBook(id) {
    const query = `SELECT * FROM book_notes WHERE id = $1`;

    const result = await db.query(query, [id]);

    return result.rows[0];
  }

  static async editSpecificBook(id, book_notes, rating) {
    const query = `UPDATE book_notes
      SET notes=$2,rating=$3
      WHERE id=$1`;

    const result = await db.query(query, [id, book_notes, rating]);

    return result.rows;
  }

  static async deleteBook(id) {
    const query = `DELETE FROM book_notes WHERE id = $1`;

    const result = await db.query(query, [id]);

    return result.rows;
  }
}

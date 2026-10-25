import db from "../config/db.js";

export class unique_books {

  static async addBook(title) {
    const query = "INSERT INTO unique_books (book_name) VALUES ($1)";

    const result = await db.query(query,[title]);

    return result.rows;
  }

}

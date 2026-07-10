import db from "../config/db.js";

export class apiDataModel {

  static async checkNullOLID() {
    const nullRecords = await db.query("SELECT * from book_notes WHERE olid IS NULL");
    return nullRecords.rows;
  }

}

import db from "../config/db.js";

export class apiModel {

  static async checkNullOLID() {
    const nullRecords = await db.query("SELECT * from book_notes WHERE olid IS NULL");
    return nullRecords.rows;
  }

  static async addApiData(apiResponse) {
    const AddedResponse = await db.query("INSERT INTO book_notes (olid,original_title,publication_year,author) VALUES ($1,$2,$3,$4)",[apiResponse.cover_edition_key,apiResponse.title,apiResponse.first_publish_year,apiResponse.author_name]);
    return AddedResponse.rows
  }
}

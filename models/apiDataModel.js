import db from "../config/db.js";

export class apiModel {

  static async checkNullOLID() {
    const nullRecords = await db.query("SELECT * from book_notes WHERE olid IS NULL");
    return nullRecords.rows;
  }

  static async checkNullBookCoverLink() {
    const nullLinks = await db.query("SELECT * from book_notes WHERE book_cover_link IS NULL");
    return nullLinks.rows;
  }

  static async addApiData(apiResponse,id) {
    const AddedResponse = await db.query("UPDATE book_notes SET olid=$1,original_title=$2,publication_year=$3,author=$4 WHERE id=$5",[apiResponse.cover_edition_key,apiResponse.title,apiResponse.first_publish_year,apiResponse.author_name,id]);
    return AddedResponse.rows
  }
}

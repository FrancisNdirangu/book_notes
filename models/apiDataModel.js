import db from "../config/db.js";

export class apiModel {

  static async checkNullOLID() {
    const nullRecords = await db.query("SELECT * from book_notes WHERE olid IS NULL AND existinapi = $1",[true]);
    return nullRecords.rows;
  }

  static async checkNullBookCoverLink() {
    const nullLinks = await db.query("SELECT * from book_notes WHERE book_cover_link IS NULL and existinapi",[true]);
    return nullLinks.rows;
  }

  static async addApiData(apiResponse,id) {
    const AddedResponse = await db.query("UPDATE book_notes SET olid=$1,original_title=$2,publication_year=$3,author=$4 WHERE id=$5",[apiResponse.cover_edition_key,apiResponse.title,apiResponse.first_publish_year,apiResponse.author_name,id]);
    return AddedResponse.rows
  }

  static async addBookCoverLink(link,id) {
    const addedLinks = await db.query("UPDATE book_notes SET book_cover_link=$1 WHERE id=$2", [link, id]);
    return addedLinks.rows
  }


  static async nullExistRows() {
    const nullRows = await db.query("SELECT * FROM book_notes WHERE existInAPI is NULL");
    return nullRows.rows
  }

  static async addExistInApi(exists,title) {
    const existsValue = await db.query("UPDATE book_notes SET existInAPI = $1 WHERE title = $2",[exists,title]);
    return existsValue.rows
  }

}

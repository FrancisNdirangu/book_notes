import db from "../config/db.js"

export function currentTitle(id) {
  const query = "SELECT title FROM book_notes WHERE id=$1";

  const currentID = id;
  const title = db.query(query,[currentID]);
  console.log(`current title is ${title}`)
  return title
}

export function updateBookCover(id,updatedOLID,book_cover_link) {
  const query = "UPDATE book_notes SET olid = $1, book_cover_link=$2  WHERE id=$3"
  const update = db.query(query,[updatedOLID,book_cover_link,id]);
  console.log(`OLID and book cover link have been updated for id: ${id}`);
}

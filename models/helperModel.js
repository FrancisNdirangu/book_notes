import db from "../config/db.js"

export function currentTitle(id) {
  const query = "SELECT title FROM book_notes WHERE id=$1";

  const currentID = id;
  const title = db.query(query,[currentID]);
  console.log(`current title is ${title}`)
  return title
}

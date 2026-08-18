import { booksJsonResponse } from "../apihelpers/bookApi.js";
import { bookModel } from "../models/bookModel.js";
import {currentTitle, updateBookCover} from "../models/helperModel.js";

export async function checkOLID(id,updatedTitle) {

  try{

    const title = updatedTitle;
    console.log(title);
    const editedTitle = await currentTitle(id);

    if (title.toLowerCase().trim() !== editedTitle.toLowerCase().trim()) {
      // call the helper api to get the new olid and update the db with the new olid
      const bookJSON = await booksJsonResponse(updatedTitle);
      const newOLID = await bookJSON['cover_edition_key'];
      const link_base = "https://covers.openlibrary.org/b/olid/"
      const endOfLink = "-M.jpg"

      const new_cover_link = link_base+newOLID+endOfLink;

      const update = updateBookCover(id,newOLID,new_cover_link);


    }

  } catch(error) {
    console.error("Error in checkOLID function in bookService.js: ",error);
  }
};

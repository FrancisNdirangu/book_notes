import { booksJsonResponse } from "../apihelpers/bookApi.js";
import { bookModel } from "../models/bookModel.js";
import {currentTitle, updateBookCover} from "../models/helperModel.js";
import { booksJsonResponse } from "../apihelpers/bookApi.js";

export function async checkOLID(id,updatedTitle) {

  try{

    const title = updatedTitle;
    const currentTitle = currentTitle(id);

    if (title.toLowerCase().trim() !== currentTitle.toLowerCase().trim()) {
      // call the helper api to get the new olid and update the db with the new olid
      const bookJSON = await booksJsonResponse(updatedTitle);
      const newOLID = await bookJSON['cover_edition_key'];
      const link_base = "https://covers.openlibrary.ord/b/olid/"
      const endOfLink = "-M.jpg"

      const new_cover_link = link_base+newOLID+endOfLink;

      const update = updateBookCover(id,newOLID,new_cover_link);


    }

  } catch(error) {
    console.error("Unable to compare the title and updatedTitle",error);
  }
};

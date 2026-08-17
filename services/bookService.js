import { booksJsonResponse } from "../apihelpers/bookApi.js";
import { bookModel } from "../models/bookModel.js";
import {currentTitle} from "../models/helperModel.js";

export function checkOLID(id,updatedTitle) {

  try{

    const title = updatedTitle;
    const currentTitle = currentTitle(id);


  } catch(error) {
    console.error("Unable to compare the title and updatedTitle",error);
  }
}

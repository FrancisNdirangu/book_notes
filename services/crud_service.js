import { bookInAPI, searchBookWithCover } from "../apihelpers/openLibraryClient.js";
import { bookModel } from "../models/bookModel.js";
import {apiModel} from "../models/apiDataModel.js";
import { dbBookID } from "../models/helperModel.js";

export async function deleteBookService(id){
  const bookId = id;

  const deleteBook = await bookModel.deleteBook(bookId);
  return deleteBook.rows;
}

export async function AddBookService(title,bookRating,dateRead,review) {

  const existsInAPI = await bookInAPI(title);
  //adding a 0.5 sec delay to avoid rate limiting
  setTimeout(() => { console.log("Small delay to avoid rate limiting");},500);


  const added = bookModel.addBook(title,review,dateRead,bookRating);
  if (existsInAPI) {
    const bookApiData = await searchBookWithCover(title);
    const bookID = await dbBookID(title);
    // const original_title = bookApiData.title;
    // const olid = bookApiData.olid;
    // const publication_year = bookApiData.year_published;
    // const cover_url = bookApiData.book_cover_url;

    const enrichmentDataAdded = await apiModel.addApiDataFinal(bookApiData,bookID);

  }
  
}

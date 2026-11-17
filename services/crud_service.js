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


  const added = await bookModel.addBook(title,review,dateRead,bookRating);
  const bookApiData = await searchBookWithCover(title);

  // the if statement below checks if the book is in the api and exits the AddBookService function if it is not since there is no need to look for metadata if the book is not in the function
  if (bookApiData == null){
    return new Error('the book does not exist in the api, hence no metadata can be found');
  }
  const bookID = await dbBookID(title);

  const enrichmentDataAdded = await apiModel.addApiDataFinal(bookApiData,bookID);

  
}

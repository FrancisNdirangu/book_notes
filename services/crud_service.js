import { bookModel } from "../models/bookModel.js";

export async function deleteBookService(id){
  const bookId = id;

  const deleteBook = await bookModel.deleteBook(bookId);
  return deleteBook.rows;
}

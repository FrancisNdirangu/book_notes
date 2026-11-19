import { booksJsonResponse } from "../apihelpers/bookApi.js";
import { bookModel } from "../models/bookModel.js";
import {checkOLID, refreshMetadata} from "../services/bookService.js";
import {AddBookService, deleteBookService} from "../services/crud_service.js";
import { checkBookResults } from "../services/bookService.js";
import { bookSearchResults } from "../apihelpers/bookApi.js";
import { bookInAPI,searchBookWithCover } from "../apihelpers/openLibraryClient.js";

export const getBookInfo = async (req, res,next) => {
  try {
    const bookName = await req.body?.bookInput;
    console.log(bookName);
    const booksJson = searchBookWithCover(bookName);
    console.log(booksJson);
    res.render("../views/index.ejs");
  } catch (error) {
    console.error("Unable to correctly query for the book", error);
    next(error);
  }
};

export const addBookNotes = async (req, res, next) => {
  try {
    const bookTitle = req.body.title;
    const bookRating = req.body.rating;
    const dateRead = req.body.dateRead;
    const review = req.body.review;

    //console.log(bookTitle);
    // ensure that the variables above exist

    if (!req.body || Object.keys(req.body).length ===0) {
      throw new Error('The HTTP connection that fetches the req.body has failed');
    }

    const addingService = await AddBookService(bookTitle,bookRating,dateRead,review);


    res.redirect("/");
  } catch (error) {
    res.redirect("/")
    console.error("Unable to add the book to the db", error);
    next(error);

}};

export const editBookNotes = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const editedTitle = req.body.title;
    const editedNotes = req.body.notes;
    const newRating = req.body.rating;


    if(!req.body || Object.keys(req.body).length === 0) {
      throw new Error('The HTTP connection that fetches the req.body has failed');
    }
      const edited = await bookModel.editSpecificBook(
      bookId,
      editedNotes,
      newRating,
      editedTitle
    );


      // const updateOLID = await checkOLID(bookId,editedTitle) };

      // const updateOLID = await refreshMetadata(bookId) ;

      const updateOLID = await refreshMetadata(bookId) ;
    res.redirect("/");
  } catch (error) {
    res.redirect("/")
    console.error(`Could not edit the book notes. Error:`, error);
    next(error);
  }
};

export const deleteBookNotes = async (req, res, next) => {

  try {
    const bookId = req.params.id
    console.log(bookId);
    console.log(`Book id: ${bookId} was deleted`)
    const deleted = await deleteBookService(bookId);
    //const deleted = await bookModel.deleteBook(bookId);
    res.redirect("/");

  } catch (error) {
    console.error('Could not extract the id from the delete button',error);
    next(error);
  }
}

export const refreshData = async (req,res,next) => {
  try {
    const bookId = req.params.id;


    const refresh = await refreshMetadata(bookId);

    res.redirect(`/${bookId}/view`);
  } catch (error) {
    console.error('refreshData controller failed because of:',error);
    throw error
  }
}

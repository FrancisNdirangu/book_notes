import { booksJsonResponse } from "../apihelpers/bookApi.js";
import { bookModel } from "../models/bookModel.js";

export const getBookInfo = async (req, res) => {
  try {
    const bookName = await req.body?.bookInput;
    console.log(bookName);
    const booksJson = booksJsonResponse(bookName);
    console.log(booksJson);
    res.render("../views/index.ejs");
  } catch (error) {
    console.error("Unable to correctly query for the book", error);
  }
};

export const addBookNotes = async (req, res, next) => {
  try {
    const bookTitle = req.body.title;
    const bookRating = req.body.rating;
    const dateRead = req.body.dateRead;
    const review = req.body.review;

    console.log(bookTitle);

    const added = await bookModel.addBook(
      bookTitle,
      review,
      dateRead,
      bookRating,
    );

    res.redirect("/");
  } catch (error) {
    console.error("Unable to add the book to the db", error);
  }
};

export const editBookNotes = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const editedNotes = req.body.editedNotes;
    const newRating = req.body.newRating;

    const edited = await bookModel.editSpecificBook(
      bookId,
      editedNotes,
      newRating,
    );

    res.redirect("/");
  } catch (error) {
    console.error(`Could not edit the book notes. Error:`, error);
  }
};

export const deleteBookNotes = async (req, res, next) => {

  try {
    const bookId = req.body.id
    //console.log(bookId);
    const deleted = await bookModel.deleteBook(bookId);
    res.redirect("/");
  } catch (error) {
    console.error('Could not extract the id from the delete button',error);
  }
}

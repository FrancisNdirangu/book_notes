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

    const added = await bookModel.addBook(
      bookTitle,
      review,
      dateRead,
      bookRating,
    );

    req.redirect("/");
  } catch (error) {
    console.error("Unable to add the book to the db", error);
  }
};

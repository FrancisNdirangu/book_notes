import { booksJsonResponse } from "../apihelpers/bookApi";

export const getBookInfo = async (req, res) => {
  try {
    const bookName = req.body.bookInput;
    console.log(bookName);
    const booksJson = booksJsonResponse(bookName);
    console.log(booksJson);
    res.render("views/index.ejs");
  } catch (error) {
    console.log("Unable to correctly query for the book", error);
  }
};

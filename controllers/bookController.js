import { booksJsonResponse } from "../apihelpers/bookApi.js";

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

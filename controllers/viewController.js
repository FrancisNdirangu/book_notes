import { bookModel } from "../models/bookModel.js";

export async function listAllBooks(req, res, next) {
  try {
    const response = await bookModel.viewAllBooks();
    const all_records = response.rows;

    res.render("../views/view.ejs", { allBookNotes: all_records });
  } catch (error) {
    console.error("Unable to display the all the records", error);
  }
}

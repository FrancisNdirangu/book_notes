import { bookModel } from "../models/bookModel.js";

export async function listAllBooks(req, res, next) {
  try {
    const all_records = await bookModel.viewAllBooks();
    console.log(all_records);

    res.render("../views/view.ejs", { allBookNotes: all_records });
  } catch (error) {
    console.error("Unable to display the all the records", error);
  }
}

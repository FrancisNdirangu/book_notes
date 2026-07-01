import { bookModel } from "../models/bookModel.js";

export async listAllBooks(req,res,next) {
  try {
    const response = await bookModel.viewAllBooks();
    const all_records = response.rows;


    res.render("/view.ejs", { allBookNotes: all_records });
  }
}

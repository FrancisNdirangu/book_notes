import { bookModel } from "../models/bookModel.js";

export async function listAllBooks(req, res, next) {
  try {
    const all_records = await bookModel.viewAllBooks();
    //console.log(all_records);

    res.render("../views/view.ejs", { allBookNotes: all_records });
  } catch (error) {
    console.error("Unable to display the all the records", error);
  }
}

export async function viewSpecificReview(req, res, next) {
  try {
    const reviewID = req.params.id;
    const specificReview = await bookModel.viewSpecificBook(reviewID);
    console.log(specificReview);

    res.render("../views/specificView.ejs", {
      blog: specificReview,
      id: reviewID,
    });
  } catch (error) {
    console.error("Unable to get that review from the database");
  }
}

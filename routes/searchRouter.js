import {
  getBookInfo,
  addBookNotes,
  editBookNotes,
  deleteBookNotes
} from "../controllers/bookController.js";
import {
  listAllBooks,
  viewSpecificReview,
  addBookPage,
  editBookPage,
} from "../controllers/viewController.js";
import { nullOlidRows,createBookCoverLinks } from "../middleware/dbCheck.js";
import express from "express";
import { bookSchema } from "../validators/bookSchema.js";
import { validateAddBookNotes,validateEditBookNotes } from "../middleware/validate.js";
import {editedBookSchema} from "../validators/editBookSchema.js"

const router = express.Router();

router.get("/",nullOlidRows ,createBookCoverLinks,listAllBooks);

router.get("/:id/view", viewSpecificReview);

router.get("/addBookNotes", addBookPage);
router.post("/addBookNotes",validateAddBookNotes(bookSchema), addBookNotes);

router.get("/:id/edit", editBookPage);
router.post("/books/:id/edit",validateEditBookNotes(editedBookSchema),editBookNotes);

router.get("/search", getBookInfo);
router.post("/search", getBookInfo);

router.post("/books/:id/delete", deleteBookNotes);

export default router;

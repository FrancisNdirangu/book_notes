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

const router = express.Router();

router.get("/",nullOlidRows ,createBookCoverLinks,listAllBooks);

router.get("/:id/view", viewSpecificReview);

router.get("/addBookNotes", addBookPage);
router.post("/addBookNotes", addBookNotes);

router.get("/:id/edit", editBookPage);

router.get("/search", getBookInfo);
router.post("/search", getBookInfo);

router.post("/deleteBookNote", deleteBookNotes);

export default router;

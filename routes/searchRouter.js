import {
  getBookInfo,
  addBookNotes,
  editBookNotes,
} from "../controllers/bookController.js";
import {
  listAllBooks,
  viewSpecificReview,
  addBookPage,
  editBookPage,
} from "../controllers/viewController.js";
import express from "express";

const router = express.Router();

router.get("/", listAllBooks);

router.get("/:id/view", viewSpecificReview);

router.get("/addBookNotes", addBookPage);

router.get("/:id/edit", editBookPage);

router.get("/search", getBookInfo);
router.post("/search", getBookInfo);

export default router;

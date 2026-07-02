import { getBookInfo } from "../controllers/bookController.js";
import {
  listAllBooks,
  viewSpecificReview,
} from "../controllers/viewController.js";
import express from "express";

const router = express.Router();

router.get("/", listAllBooks);

router.get("/:id/edit", viewSpecificReview);

router.get("/search", getBookInfo);
router.post("/search", getBookInfo);

export default router;

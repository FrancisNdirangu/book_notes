import { getBookInfo } from "../controllers/bookController.js";
import { listAllBooks } from "../controllers/viewController.js";
import express from "express";

const router = express.Router();

router.get("/", listAllBooks);

router.get("/search", getBookInfo);
router.post("/search", getBookInfo);

export default router;

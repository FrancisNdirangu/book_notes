import { getBookInfo } from "../controllers/bookController";
import express from "express";

const router = express.Router();

router.get("/movies", getBookInfo);

export default router;

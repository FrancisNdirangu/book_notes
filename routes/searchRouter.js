import { getBookInfo } from "../controllers/bookController.js";
import express from "express";

const router = express.Router();

router.get("/", getBookInfo);

export default router;

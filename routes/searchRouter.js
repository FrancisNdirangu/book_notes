import { getBookInfo } from "../controllers/bookController";
import express from "express";

const router = express.Router();

router.get("/", getBookInfo);

router.post("/", getBookInfo);

export default router;

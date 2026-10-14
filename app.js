import express from "express";
import path from "path";
import searchRouter from "./routes/searchRouter.js";
import {centralErrorHandler} from "./middleware/errorHandler.js";
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", searchRouter);

app.use(centralErrorHandler); //error handler comes after the routes

export default app;

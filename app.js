import express from "express";
import path from "path";
import searchRouter from "./routes/searchRouter.js";
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", searchRouter);
app.use("/:id/view", searchRouter);

export default app;

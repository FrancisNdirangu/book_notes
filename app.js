import express from "express";
import path from "path";

const app = express();

app.set("view engine", "ejs");
app.set(express.urlencoded({ extended: true }));
app.use(express.static("public"));

export default app;

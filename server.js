import "dotenv/config";
import pg from "pg";
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const SEARCH_URL = `https://openlibrary.org/search.json?q=`;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Setting the viewing engine to EJS
app.set("view_engine", "ejs");

const db = new pg.Client({
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect();

const testQuery = await db.query("SELECT * from book_notes");
console.log(testQuery.rows);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/index", (req, res) => {
  res.render("index.ejs");
});

app.get("/view", (req, res) => {
  res.render("view.ejs");
});

app.post("/user-input", async (req, res) => {
  const book_name_input = req.body.movieInput;
  console.log(book_name_input);
  const formattedQuery = encodeURIComponent(book_name_input).replace(
    /%20/g,
    "+",
  );
  console.log(formattedQuery);
  try {
    const response = await axios.get(SEARCH_URL + book_name_input);
    console.log(response["data"]["docs"][0]);
  } catch (error) {
    console.error("Failed to conduct the search for the movie name properly");
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

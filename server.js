import "dotenv/config";
import pg from "pg";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

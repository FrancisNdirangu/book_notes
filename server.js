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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

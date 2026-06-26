import "dotenv/config";
import axios from "axios";

export const booksJsonResponse = async (book_name) => {
  const response = await axios.get(process.env.SEARCH_URL + book_name);
  console.log(response);
  return response;
};

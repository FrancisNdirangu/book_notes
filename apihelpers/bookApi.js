import "dotenv/config";
import axios from "axios";

export const booksJsonResponse = async (book_name) => {
  const properly_formatted_book_name = encodeURIComponent(book_name).replace('/%20/g', '+')
  const response = await axios.get(process.env.SEARCH_URL + properly_formatted_book_name);
  console.log(response);
  return response;
};

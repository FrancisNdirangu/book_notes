import "dotenv/config";
import axios from "axios";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const booksJsonResponse = async (book_name) => {
  const properly_formatted_book_name = encodeURIComponent(book_name).replace('/%20/g', '+')
  console.log(properly_formatted_book_name);
  const response = await axios.get(process.env.SEARCH_URL + properly_formatted_book_name);
  console.log(JSON.stringify(response.data['docs'][0]));

  await sleep(2000); // a delay so that the api doesnt get rate limited
  return response.data['docs'][0];
};

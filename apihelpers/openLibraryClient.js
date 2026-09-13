import axios from "axios";
import "dotenv/config"


// I will create a client that can be reused
// This client will have the timeout, header like User_Agent and Accept and family:4 (to force ipv4 prevent connection timeouts)

const openLibraryClient = axios.create({
  baseURL: process.env.OPENLIBRARYBASEURL,
  timeout:8000,
  headers: {
    "User-Agent": process.env.USERAGENTHEADER,
    "Accept": "application/json",
  },
  family:4,

});

const searchBookWithCover = async (title) => {

  try {
    const response = openLibraryClient.get('/search.json',{
      params: {
        q: title.trim(),
        fields: "title,author_name,cover_edition_key,first_publish_year,series_key,series_name,series_position",
        lang:"eng",
        limit:3
      }
    });

    const book = response.data.docs[0]; //using the first result only despite the limit giving us the top 3 results in english

    if (!book) {
      return null;
    }


    // the line below start by checking if the olid exists, if it does it creates the url using the structure 
    const coverURL = book.cover_edition_key ? `https://covers.openlibrary.org/a/olid/${book.cover_edition_key}-M.jpg` : null;


    return {
      title:book.title,
      author:book.author_name ? book.author_name[0] : "Unknown Author",
      olid: book.cover_edition_key,
      year_published: book.first_publish_year,
      book_cover_url: coverURL, //null if there is no url
    }

    //construct the cover api url using the olid
    //we are setting the default to be false so that we actually get a 404 error when no cover is found instead of the default white pixel



  } catch (error){
    console.error("Open Library API Error:",error.message);
    throw error;
  }
}

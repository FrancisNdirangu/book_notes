import axios from "axios";
import "dotenv/config"
import Fuse from 'fuse.js'


// I will create a client that can be reused
// This client will have the timeout, header like User_Agent and Accept and family:4 (to force ipv4 prevent connection timeouts)

export const openLibraryClient = axios.create({
  baseURL: process.env.OPENLIBRARYBASEURL,
  timeout:8000,
  headers: {
    "User-Agent": process.env.USERAGENTHEADER,
    "Accept": "application/json",
  },
  family:4,

});


const max_retries = 3;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve,ms));

openLibraryClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    //only retry on network errors or 5xx server errors
    const shouldRetry = !error.response || (error.response.status >= 500 && error.response.status < 600);

    if(!shouldRetry) {
      throw new Error('the error is not a network or server error');
    }

    config._retryCount = config._retryCount ?? 0;

    if (config._retryCount >= max_retries) {
      throw new Error('max retries reached');
    }

    config._retryCount += 1;

    const backoff = 500*2 **config._retryCount;
    await delay(backoff);

    return openLibraryClient(config);

  }
);

export const searchBookWithCover = async (title) => {

  try {
    const response = await openLibraryClient.get('/search.json',{
      params: {
        q: title.trim(),
        fields: "title,author_name,cover_edition_key,first_publish_year,series_key,series_name,series_position",
        lang:"eng",
        limit:10
      }
    });

    if (response.data.numFound == 0) {
      return null;
    }

    const unsearchedResponses = response.data.docs; //using the first result only despite the limit giving us the top 3 results in english

    const listTitles = [];

    for (let i = 0; i<unsearchedResponses.length; i++) {
      const eachResponse = unsearchedResponses[i];
      const titleBook = eachResponse.title
      listTitles.push({title:titleBook})
    }

    const fuse = new Fuse(listTitles,{useTokenSearch:true,keys:['title'],findAllMatches:true,includeScore:true});

    const searchResults = fuse.search(title)

    sortedResults = searchResults.sort((a,b) => a.score - b.score);
    console.log(sortedResults);
    const bestResult = sortedResults[0];
    const bestResultIndex = bestResult ? bestResult.refIndex: null;

    const book = unsearchedResponses[bestResultIndex]; //the book with the best match





    // the line below start by checking if the olid exists, if it does it creates the url using the structure 
    const coverURL = book.cover_edition_key ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg` : null;


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

export const bookInAPI = async (title) => {
  try {
    const response = await openLibraryClient.get('/search.json',{
      params: {
        q: title.trim(),
        limit:0
      }
    });

    const numResults = response.data.numFound;

    console.log(`The book: ${title} appears this many times ${numResults}`);

    return numResults >= 1;

  } catch (error) {
    console.error(`The open library client in the function bookInAPI is unable to fetch data from the api:`,error.message);
    throw error;
  }
}

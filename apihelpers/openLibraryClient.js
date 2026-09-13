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
        fields: "title,author_name,cover_edition_key,first_publish_year",
        lang:"eng",
        limit:3
      }
    });

    const book = response.data.docs[0]; //using the first result only despite the limit giving us the top 3 results in english

  }
}

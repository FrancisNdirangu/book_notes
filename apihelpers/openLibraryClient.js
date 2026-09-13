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

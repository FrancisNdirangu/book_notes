import {apiModel} from "../models/apiDataModel.js";
import {booksJsonResponse} from "../apihelpers/bookApi.js"

export const nullOlidRows = async (req,res,next) => {
  try{

    const nullRecords = await apiModel.checkNullOLID();
    //console.log(nullRecords);

    if (nullRecords) {
      nullRecords.forEach((record) => {
        //console.log(record.title);
        const bookInfoResponse = booksJsonResponse(record.title);
        const addingInfoDB = apiModel.addApiData(bookInfoResponse,record.id);
      });
    }
    next() //tells the middleware to move on to the controller

  } catch (error) {
    next(error);
  }
}

export const createBookCoverLinks = async (req, res, next) => {
  try {
    const nullLinks = await apiModel.checkNullBookCoverLink();
    //console.log('Null Links records:',nullLinks.rows);
    const cover_base_link = "https://covers.openlibrary.org/b/olid/";
    //console.log(nullLinks);
    if (nullLinks) {
      nullLinks.forEach((record) => {
        const current_olid = record.olid
        console.log('current olid:',current_olid);
        const link = cover_base_link + current_olid + "-M.jpg";
        const addLinksToDB = apiModel.addBookCoverLink(link, record.id)
      })
    }
    next();
  } catch (error) {
    next(error);
  }
}

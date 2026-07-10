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
      });
    }
    next() //tells the middleware to move on to the controller

  } catch (error) {
    next(error);
  }
}

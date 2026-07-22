import {apiModel} from "../models/apiDataModel.js";
import {booksJsonResponse} from "../apihelpers/bookApi.js"

export const nullOlidRows = async (req,res,next) => {
  try{

    const nullRecords = await apiModel.checkNullOLID();
    //console.log(nullRecords);

    if (nullRecords) {
      nullRecords.forEach(async (record) => {
        //console.log(record.title);
        const bookInfoResponse = await booksJsonResponse(record.title);
        const addingInfoDB = await apiModel.addApiData(bookInfoResponse,record.id);
      });
    }
    next() //tells the middleware to move on to the controller

  } catch (error) {
    next(error);
  }
}

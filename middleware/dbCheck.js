import apiModel from "../models/apiDataModel.js";

export const nullOlidRows = async (req,res,next) => {
  try{

    const nullRecords = await apiModel.nullOlidRows();
    console.log(nullRecords);
    next() //tells the middleware to move on to the controller

  } catch (error) {
    next(error);
  }
}

import express from "express";
import { apiModel } from "../models/apiDataModel.js";

export const recordExists = async (req,res,next) => {

  const id_path_param = req.params.id;
  const maxId = await apiModel.maxIdValue();

  if (id_path_param < 0 || id_path_param>maxId) {

    console.log(`${id_path_param} is not a valid record in the id column of the database table book_notes`);

    return res.status(404).render('../views/not_found.ejs');
  }

  next();

}

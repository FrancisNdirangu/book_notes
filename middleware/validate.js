import Joi from "joi";
import express from"express";

export const validateAddBookNotes = (schema) => {
  return (req,res,next) => {
    const {error,value} = schema.validate(req.body)

    if (error) {
      const fieldErrors = {};
      error.details.forEach( (item) => {
        const errorName = item.path[0];
        if(!fieldErrors[errorName]) {
          fieldErrors[errorName] = error.message;
        }

        res.status(400).render('../views/addNotes.ejs',{fieldErrors,
        formData:req.body});
      })
    }
  }
}

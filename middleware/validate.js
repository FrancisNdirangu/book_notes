import Joi from "joi";
import express from"express";

export const validateAddBookNotes = (schema) => {
  return (req,res,next) => {
    const {error,value} = schema.validate(req.body,{abortEarly:false,stripUnknown:true});

    if (error) {
      const fieldErrors = {};
      error.details.forEach( (item) => {
        const errorName = item.path[0];
        if(!fieldErrors[errorName]) {
          fieldErrors[errorName] = item.message;
        }
      });

        return res.status(400).render('../views/addNotes.ejs',{fieldErrors,
        formData:req.body});
      }
    
    //this next below might not be good since we dont want the controller getting 
    //no data after we raise the validation error
    //next() //tells the middleware to move on to the controller
  }
}

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
    
    //no data after we raise the validation error
    next() //tells the middleware to move on to the controller
  }
}

export const validateEditBookNotes = (schema) => {
  return (req,res,next) => {
    const{error,value} = schema.validate(req.body,{abortEarly:false,stripUnknown:true});
    // adding the req.params.id to the req.body object so that the path parameter can be passed if we get a validation error
    const blog  = {...req.body,id:req.params.id};

    if (error) {
      const fieldErrors = {};
      error.details.forEach( (item) => {
        const errorName = item.path[0];
        if (!fieldErrors[errorName]) {
          fieldErrors[errorName] = item.message;
        }

      });

      return res.status(400).render('../views/editing_page.ejs',{fieldErrors,blog});
    }
    next();
  }
}

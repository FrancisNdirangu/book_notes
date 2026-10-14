import express from "express";

export const centralErrorHandler = (err,req,res,next) => {

  const errorName = err.name;
  const errorCause = err.cause || null;
  const errorCode = err.statusCode || 500;
  const errorDescription = err.message || 'Internal Server Error';
  const errorStack = err.stack;

  console.error({timestamp:new Date().toISOString(),
                  errCode:errorCode,
                  message:errorDescription,
                  stack:errorStack});

  return res.status(errorCode).json({
      success:false,
      error:{ code:errorCode,
        description:errorDescription,
        stack:errorStack} });

}

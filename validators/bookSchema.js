import Joi from "joi";

export const bookSchema = Joi.object({
  title:Joi.string().trim().min(1).max().required(),
  notes:Joi.string().trim().trim().allow('').max(3000).optional(),
  date_read:Joi.date().format('YYYY-MM-DD').max('now').required(),
  rating:Joi.number().integer().min(1).max(5).required()
});

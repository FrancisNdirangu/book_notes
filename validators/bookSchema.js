import BaseJoi from "joi";
import { JoiDate } from "@joi/date";

const Joi = BaseJoi.extend(JoiDate);

export const bookSchema = Joi.object({
  title:Joi.string().trim().min(1).max(300).required(),
  review:Joi.string().trim().allow('').max(3000).optional(),
  dateRead:Joi.date().format('YYYY-MM-DD').max('now').required(),
  rating:Joi.number().integer().min(1).max(5).required()
});

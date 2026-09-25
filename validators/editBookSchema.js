import BaseJoi from "joi";
import { JoiDate } from "@joi/date";

const Joi = BaseJoi.extend(JoiDate);

export const editedBookSchema = Joi.object({
  title: Joi.string().trim().min(1).max(300).required(),
  editedNotes:Joi.string().trim().allow("").max(3000).optional(),
  date:Joi.date().format('YYYY-MM-DD').max('now').required(),
  newRating:Joi.number().integer().min(1).max(5).required()

})

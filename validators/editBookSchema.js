import BaseJoi from "joi";
import { JoiDate } from "@joi/date";

const Joi = BaseJoi.extend(JoiDate);

export const editedBookSchema = Joi.object({
  title: Joi.string().trim().min(1).max(300).required(),
  notes:Joi.string().trim().allow("").max(3000).optional(),
  date:Joi.date().format('YYYY-MM-DD').max('now').optional(),
  rating:Joi.number().integer().min(1).max(5).optional(),
  id: Joi.number().integer()

})

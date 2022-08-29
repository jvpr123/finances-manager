import * as Joi from "joi";

export const FindUnitByNameJoiSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
});

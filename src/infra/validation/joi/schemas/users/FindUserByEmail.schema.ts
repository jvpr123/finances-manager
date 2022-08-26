import * as Joi from "joi";

export const FindUserByEmailJoiSchema = Joi.object({
  email: Joi.string().email().min(5).max(100).required(),
});

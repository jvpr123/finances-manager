import * as Joi from "joi";

import { ICreateTagInput } from "src/domain/dto/tags/CreateTag.dto";

export const CreateTagJoiSchema = Joi.object<ICreateTagInput, true>({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(5).max(255).required(),
  color: Joi.string().min(7).max(7).required(),
});

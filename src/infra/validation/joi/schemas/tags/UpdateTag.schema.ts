import * as Joi from "joi";

import { IUpdateTagInput } from "src/domain/dto/tags/UpdateTag.dto";

export const UpdateTagJoiSchema = Joi.object<IUpdateTagInput, true>({
  id: Joi.string().uuid().required(),
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(5).max(255).required(),
  color: Joi.string().min(7).max(7).required(),
});

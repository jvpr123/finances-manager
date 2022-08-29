import * as Joi from "joi";

import { IUpdateUnitInput } from "src/domain/dto/units/IUpdateUnit.dto";

export const UpdateUnitJoiSchema = Joi.object<IUpdateUnitInput, true>({
  id: Joi.string().uuid().required(),
  name: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(5).max(255).required(),
});

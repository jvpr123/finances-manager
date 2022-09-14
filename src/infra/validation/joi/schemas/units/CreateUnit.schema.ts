import * as Joi from "joi";

import { ICreateUnitInput } from "src/domain/dto/units/ICreateUnit.dto";

export const CreateUnitJoiSchema = Joi.object<ICreateUnitInput, true>({
  ownerId: Joi.string().uuid().required(),
  name: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(5).max(255).required(),
  initialBalance: Joi.number().min(0).required(),
});

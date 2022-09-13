import * as Joi from "joi";

import { IUpdateCategoryInput } from "src/domain/dto/categories/UpdateCategory.dto";

export const UpdateCategoryJoiSchema = Joi.object<IUpdateCategoryInput, true>({
  id: Joi.string().uuid().required(),
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(5).max(255).optional(),
  color: Joi.string().min(7).max(7).optional(),
});

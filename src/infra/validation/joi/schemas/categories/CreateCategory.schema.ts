import * as Joi from "joi";

import { ICreateCategoryInput } from "src/domain/dto/categories/CreateCategory.dto";

export const CreateCategoryJoiSchema = Joi.object<ICreateCategoryInput, true>({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(5).max(255).required(),
  color: Joi.string().min(7).max(7).required(),
});

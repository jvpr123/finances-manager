import * as Joi from "joi";

import {
  IUpdateUserDto,
  IUpdateUserInput,
} from "src/domain/dto/users/UpdateUser.dto";

export const UpdateUserJoiSchema = Joi.object<
  IUpdateUserDto,
  true,
  IUpdateUserInput
>({
  id: Joi.string().uuid().required(),
  name: Joi.string().min(3).max(255).optional(),
  email: Joi.string().email().min(5).max(100).optional(),
  phone: Joi.string()
    .pattern(/\d{11}/)
    .min(11)
    .max(11)
    .optional(),
});

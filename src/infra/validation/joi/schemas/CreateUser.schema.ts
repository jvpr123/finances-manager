import Joi from "joi";

import {
  ICreateUserInput,
  ICreateUserDto,
} from "@domain/dto/users/CreateUser.dto";

export default Joi.object<ICreateUserDto, true, ICreateUserInput>({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().min(5).max(100).required(),
  password: Joi.string().min(6).max(20).required(),
  passwordConfirmation: Joi.string().valid(Joi.in("password")),
  phone: Joi.string()
    .pattern(/\d{11}/)
    .min(11)
    .max(11)
    .required(),
});

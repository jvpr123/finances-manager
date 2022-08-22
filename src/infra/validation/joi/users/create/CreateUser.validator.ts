import { ObjectSchema } from "joi";

import { options } from "src/infra/validation/joi/Joi.options";

import {
  IValidationResult,
  IValidator,
} from "@data/protocols/Validator.interface";
import {
  ICreateUserDto,
  ICreateUserInput,
} from "@domain/dto/users/CreateUser.dto";

export class CreateUserValidator implements IValidator {
  constructor(private readonly schema: ObjectSchema<ICreateUserDto>) {}

  validate(input: any): IValidationResult {
    const { error, value } = this.schema.validate(input, options);

    if (error) {
      return {
        isValid: false,
        data: error.details.map((error) => error.message),
      };
    }

    return { isValid: true, data: value };
  }
}

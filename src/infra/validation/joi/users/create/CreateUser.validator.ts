import { ObjectSchema } from "joi";

import { ICreateUserDto } from "src/domain/dto/users/CreateUser.dto";
import { options } from "src/infra/validation/joi/config/Joi.options";
import {
  IValidationResult,
  IValidator,
} from "src/data/protocols/Validator.interface";

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

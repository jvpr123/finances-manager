import { ObjectSchema } from "joi";

import { ICreateUserDto } from "@core/domain/dto/users/CreateUser.dto";
import { options } from "@core/infra/validation/joi/config/Joi.options";
import {
  IValidationResult,
  IValidator,
} from "@core/data/protocols/Validator.interface";

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

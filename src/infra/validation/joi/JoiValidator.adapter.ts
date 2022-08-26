import { ObjectSchema } from "joi";

import { options } from "src/infra/validation/joi/config/Joi.options";
import {
  IValidationResult,
  IValidator,
} from "src/data/protocols/validation/Validator.interface";

export class JoiValidatorAdapter implements IValidator {
  constructor(private readonly schema: ObjectSchema) {}

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

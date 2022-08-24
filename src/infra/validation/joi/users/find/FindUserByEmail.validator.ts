import Joi from "joi";

import {
  IValidationResult,
  IValidator,
} from "src/data/protocols/validation/Validator.interface";
import { options } from "src/infra/validation/joi/config/Joi.options";

export class FindUserByEmailValidator implements IValidator {
  validate(input: any): IValidationResult {
    try {
      Joi.assert(
        input,
        Joi.string().email().message(`"email" must be a valid email`),
        options
      );

      return { isValid: true, data: input };
    } catch (error) {
      return {
        isValid: false,
        data: error.details.map((error: any) => error.message),
      };
    }
  }
}

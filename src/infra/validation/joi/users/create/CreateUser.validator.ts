import { ObjectSchema } from "joi";

import CreateUserSchema from "src/infra/validation/joi/schemas/CreateUser.schema";
import { options } from "src/infra/validation/joi/Joi.options";

import { IValidator } from "@data/protocols/Validator.interface";
import {
  ICreateUserDto,
  ICreateUserInput,
} from "@domain/dto/users/CreateUser.dto";

export class CreateUserValidator
  implements IValidator<ICreateUserInput, ICreateUserDto>
{
  constructor(private readonly schema: ObjectSchema<ICreateUserDto>) {}

  async validate(input: ICreateUserInput): Promise<ICreateUserDto> {
    const result = await this.schema.validateAsync(input, options);

    if (result?.details) {
      throw new Error();
    }

    return result;
  }
}

import { IUserModel } from "@domain/models/User.model";
import { ICreateUserUseCase } from "@domain/useCases/users/create/CreateUser.interface";
import {
  ICreateUserInput,
  ICreateUserDto,
} from "@domain/dto/users/CreateUser.dto";

import { IValidator } from "@data/protocols/Validator.interface";
import { IEncrypter } from "@data/protocols/Encrypter.interface";
import { IUserRepository } from "@data/protocols/UserRepository.interface";
import { ValidationError } from "src/errors/Validation.error";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly validator: IValidator,
    private readonly encrypter: IEncrypter,
    private readonly repository: IUserRepository
  ) {}

  async execute(input: any): Promise<Partial<IUserModel>> {
    const { isValid, data } = this.validator.validate(input);

    if (!isValid) {
      throw new ValidationError(data);
    }

    console.log(data);

    const hashedPassword = await this.encrypter.hash(data.password);
    const createdUser = await this.repository.create({
      ...data,
      password: hashedPassword,
    });

    return createdUser;
  }
}

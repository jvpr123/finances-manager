import { IUserModel } from "@domain/models/User.model";
import { ICreateUserUseCase } from "@domain/useCases/users/create/CreateUser.interface";
import {
  ICreateUserInput,
  ICreateUserDto,
} from "@domain/dto/users/CreateUser.dto";

import { IValidator } from "@data/protocols/Validator.interface";
import { IEncrypter } from "@data/protocols/Encrypter.interface";
import { IUserRepository } from "@data/protocols/UserRepository.interface";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly validator: IValidator<ICreateUserInput, ICreateUserDto>,
    private readonly encrypter: IEncrypter,
    private readonly repository: IUserRepository
  ) {}

  async execute(data: any): Promise<Partial<IUserModel>> {
    await this.validator.validate(data);

    const hashedPassword = await this.encrypter.hash(data.password);
    const createdUser = await this.repository.create({
      ...data,
      password: hashedPassword,
    });

    return createdUser;
  }
}

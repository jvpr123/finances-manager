import { IUserModel } from "src/domain/models/User.model";
import { ICreateUserUseCase } from "src/domain/useCases/users/create/CreateUser.interface";

import { IValidator } from "src/data/protocols/Validator.interface";
import { IEncrypter } from "src/data/protocols/Encrypter.interface";
import { IUserRepository } from "src/data/protocols/UserRepository.interface";

import { ValidationError } from "src/errors/validation/Validation.error";

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

    const hashedPassword = await this.encrypter.hash(data.password);
    const createdUser = await this.repository.create({
      ...data,
      password: hashedPassword,
    });

    return createdUser;
  }
}

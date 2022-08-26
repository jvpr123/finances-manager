import { IUserModel } from "src/domain/models/User.model";
import { ICreateUserUseCase } from "src/domain/useCases/users/create/CreateUser.interface";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { IEncrypter } from "src/data/protocols/cryptography/Encrypter.interface";
import { ICreateUserRepository } from "src/data/protocols/database/users/CreateUserRepository.interface";

import { ValidationError } from "src/errors/Validation.error";
import { IFindUsersRepository } from "src/data/protocols/database/users/FindUsersRepository.interface";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly validator: IValidator,
    private readonly encrypter: IEncrypter,
    private readonly repository: ICreateUserRepository & IFindUsersRepository
  ) {}

  async execute(input: any): Promise<Partial<IUserModel>> {
    const { isValid, data } = this.validator.validate(input);
    const emailAlreadyExists = await this.repository.findByEmail(input?.email);

    if (!isValid) throw new ValidationError(data);
    if (emailAlreadyExists) throw new ValidationError(["Email already in use"]);

    const hashedPassword = await this.encrypter.hash(data.password);

    return await this.repository.create({
      ...data,
      password: hashedPassword,
    });
  }
}

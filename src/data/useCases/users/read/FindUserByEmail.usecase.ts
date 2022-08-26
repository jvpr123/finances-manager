import { IUserModel } from "src/domain/models/User.model";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { IFindUsersRepository } from "src/data/protocols/database/users/FindUsersRepository.interface";

import { IFindUserByEmailUseCase } from "src/domain/useCases/users/read/FindUserByEmail.interface";

import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";

export class FindUserByEmailUseCase implements IFindUserByEmailUseCase {
  constructor(
    private readonly validator: IValidator,
    private readonly repository: IFindUsersRepository
  ) {}

  async execute(email: string): Promise<Partial<IUserModel>> {
    const { isValid, data } = this.validator.validate({ email });
    if (!isValid) throw new ValidationError(data);

    const userFound = await this.repository.findByEmail(email);

    if (!userFound)
      throw new NotFoundError(
        `Could not find data related to ${email} address`
      );

    return userFound;
  }
}

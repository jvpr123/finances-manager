import { IUserModel } from "src/domain/models/User.model";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { IFindUserRepository } from "src/data/protocols/database/FindUserRepository.interface";

import { ValidationError } from "src/errors/validation/Validation.error";
import { IFindUserByEmailUseCase } from "src/domain/useCases/users/read/FindUserByEmail.interface";

export class FindUserByEmailUseCase implements IFindUserByEmailUseCase {
  constructor(
    private readonly validator: IValidator,
    private readonly repository: IFindUserRepository
  ) {}

  async execute(email: string): Promise<Partial<IUserModel>> {
    const { isValid, data } = this.validator.validate(email);

    if (!isValid) {
      throw new ValidationError(data);
    }

    return await this.repository.findByEmail(email);
  }
}

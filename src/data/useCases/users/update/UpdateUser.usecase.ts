import { IUserModel } from "src/domain/models/User.model";
import { IUpdateUserUseCase } from "src/domain/useCases/users/update/UpdateUser.interface";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { IFindUsersRepository } from "src/data/protocols/database/users/FindUsersRepository.interface";
import { IUpdateUserRepository } from "src/data/protocols/database/users/UpdateUser.interface";

import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    private readonly validator: IValidator,
    private readonly repository: IUpdateUserRepository & IFindUsersRepository
  ) {}

  async execute(input: any): Promise<Partial<IUserModel>> {
    const { isValid, data } = this.validator.validate(input);
    const userExists = await this.repository.findById(input?.id);

    if (!isValid) throw new ValidationError(data);
    if (!userExists)
      throw new NotFoundError(
        `Could not update: data related to ID ${input.id} not found`
      );

    return await this.repository.update(data);
  }
}

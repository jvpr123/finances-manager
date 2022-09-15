import { IUserModel } from "src/domain/models/User.model";
import { IUpdateUserUseCase } from "src/domain/useCases/users/update/UpdateUser.interface";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { IFindUsersRepository } from "src/data/protocols/database/users/FindUsersRepository.interface";
import { IUpdateUserRepository } from "src/data/protocols/database/users/UpdateUser.interface";

import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";
import { IUpdateUserInput } from "src/domain/dto/users/UpdateUser.dto";

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    private readonly validator: IValidator,
    private readonly repository: IUpdateUserRepository & IFindUsersRepository
  ) {}

  async execute(input: IUpdateUserInput): Promise<Partial<IUserModel>> {
    const dataToUpdate = this.validateData(input);
    await this.getUser(dataToUpdate.id);

    return await this.repository.update(dataToUpdate);
  }

  private validateData(input: IUpdateUserInput): IUpdateUserInput {
    const { isValid, data } = this.validator.validate(input);

    if (!isValid) throw new ValidationError(data);

    return data;
  }

  private async getUser(id: string): Promise<Partial<IUserModel>> {
    const user = await this.repository.findById(id);

    if (!user)
      throw new NotFoundError(
        `Could not update: data related to ID ${id} not found`
      );

    return user;
  }
}

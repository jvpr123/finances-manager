import { IUnitModel } from "src/domain/models/Unit.model";
import { ICreateUnitInput } from "src/domain/dto/units/ICreateUnit.dto";
import { ICreateUnitUseCase } from "src/domain/useCases/units/create/ICreateUnit.interface";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { IFindUsersRepository } from "src/data/protocols/database/users/FindUsersRepository.interface";
import { ICreateUnitRepository } from "src/data/protocols/database/units/CreateUnitRepository.interface";

import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";
import { IUserModel } from "src/domain/models/User.model";

export class CreateUnitUseCase implements ICreateUnitUseCase {
  constructor(
    private readonly validator: IValidator,
    private readonly usersRepository: IFindUsersRepository,
    private readonly unitsRepository: ICreateUnitRepository
  ) {}

  async execute(input: ICreateUnitInput): Promise<IUnitModel> {
    const { ownerId, ...creationData } = this.validateData(input);
    const unitOwner = await this.getOwner(ownerId);

    return await this.unitsRepository.create({
      ...creationData,
      currentBalance: creationData.initialBalance,
      owner: unitOwner,
    });
  }

  private validateData(input: ICreateUnitInput): ICreateUnitInput {
    const { isValid, data } = this.validator.validate(input);

    if (!isValid) throw new ValidationError(data);

    return data;
  }

  private async getOwner(
    ownerId: string
  ): Promise<Omit<IUserModel, "password">> {
    const unitOwner = await this.usersRepository.findById(ownerId);

    if (!unitOwner)
      throw new NotFoundError(
        "Could not create: Owner data related to ID provided not found"
      );

    return unitOwner;
  }
}

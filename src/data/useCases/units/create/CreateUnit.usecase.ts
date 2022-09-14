import { IUnitModel } from "src/domain/models/Unit.model";
import { ICreateUnitInput } from "src/domain/dto/units/ICreateUnit.dto";
import { ICreateUnitUseCase } from "src/domain/useCases/units/create/ICreateUnit.interface";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { IFindUsersRepository } from "src/data/protocols/database/users/FindUsersRepository.interface";
import { ICreateUnitRepository } from "src/data/protocols/database/units/CreateUnitRepository.interface";

import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";

export class CreateUnitUseCase implements ICreateUnitUseCase {
  constructor(
    private readonly validator: IValidator,
    private readonly usersRepository: IFindUsersRepository,
    private readonly unitsRepository: ICreateUnitRepository
  ) {}

  async execute(input: ICreateUnitInput): Promise<IUnitModel> {
    const { isValid, data } = this.validator.validate(input);

    if (!isValid) throw new ValidationError(data);

    const { ownerId, ...creationData } = data;
    const unitOwner = await this.usersRepository.findById(ownerId);

    if (!unitOwner)
      throw new NotFoundError(
        "Could not create: Owner data related to ID provided not found"
      );

    return await this.unitsRepository.create({
      ...creationData,
      currentBalance: data.initialBalance,
      owner: unitOwner,
    });
  }
}

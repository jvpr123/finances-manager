import { IUpdateUnitUseCase } from "src/domain/useCases/units/update/IUpdateUnit.interface";
import { IUpdateUnitInput } from "src/domain/dto/units/IUpdateUnit.dto";
import { IUnitModel } from "src/domain/models/Unit.model";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { IFindUnitsRepository } from "src/data/protocols/database/units/FindUnitsRepository.interface";
import { IUpdateUnitRepository } from "src/data/protocols/database/units/UpdateUnitRepository.interface";

import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";

export class UpdateUnitUseCase implements IUpdateUnitUseCase {
  constructor(
    private readonly validator: IValidator,
    private readonly repository: IFindUnitsRepository & IUpdateUnitRepository
  ) {}

  async execute(input: IUpdateUnitInput): Promise<IUnitModel> {
    const { isValid, data } = this.validator.validate(input);
    const unitNameAlreadyExists = await this.repository.findByName(data?.name);

    if (!isValid) throw new ValidationError(data);

    if (unitNameAlreadyExists)
      throw new ValidationError([`'name' provided is already in use`]);

    const unitToUpdate = await this.repository.findById(data.id);

    if (!unitToUpdate)
      throw new NotFoundError(
        `Could not update: data related to ID ${input.id} not found`
      );

    return await this.repository.update(data);
  }
}

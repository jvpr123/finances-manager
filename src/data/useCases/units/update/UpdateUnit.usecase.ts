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
    const dataToUpdate = await this.validateData(input);
    await this.getUnit(dataToUpdate.id);

    return await this.repository.update(dataToUpdate);
  }

  private async validateData(
    input: IUpdateUnitInput
  ): Promise<IUpdateUnitInput> {
    const { isValid, data } = this.validator.validate(input);
    const nameAlreadyExists = await this.repository.findByName(input?.name);

    if (!isValid) {
      throw nameAlreadyExists
        ? new ValidationError([...data, '"name" provided is already in use'])
        : new ValidationError(data);
    }

    if (isValid && nameAlreadyExists)
      throw new ValidationError(['"name" provided is already in use']);

    return data;
  }

  private async getUnit(unitId: string): Promise<void> {
    const unit = await this.repository.findById(unitId);

    if (!unit)
      throw new NotFoundError(
        `Could not update: data related to ID ${unitId} not found`
      );
  }
}

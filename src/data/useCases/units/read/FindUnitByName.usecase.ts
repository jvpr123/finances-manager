import { IUnitModel } from "src/domain/models/Unit.model";
import { IFindUnitByNameUseCase } from "src/domain/useCases/units/read/IFindUnitByName.interface";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { IFindUnitsRepository } from "src/data/protocols/database/units/FindUnitsRepository.interface";
import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";

export class FindUnitByNameUseCase implements IFindUnitByNameUseCase {
  constructor(
    private readonly validator: IValidator,
    private readonly repository: IFindUnitsRepository
  ) {}

  async execute(name: string): Promise<IUnitModel> {
    const { isValid, data } = this.validator.validate({ name });
    if (!isValid) throw new ValidationError(data);

    const unitFound = await this.repository.findByName(name);
    if (!unitFound)
      throw new NotFoundError(`Could not find data related to ${name} unit`);

    return unitFound;
  }
}

import { IUnitModel } from "src/domain/models/Unit.model";
import { ICreateUnitUseCase } from "src/domain/useCases/units/create/ICreateUnit.interface";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { ICreateUnitRepository } from "src/data/protocols/database/units/CreateUnitRepository.interface";
import { ValidationError } from "src/errors/Validation.error";

export class CreateUnitUseCase implements ICreateUnitUseCase {
  constructor(
    private readonly validator: IValidator,
    private readonly repository: ICreateUnitRepository
  ) {}

  async execute(input: any): Promise<IUnitModel> {
    const { isValid, data } = this.validator.validate(input);

    if (!isValid) throw new ValidationError(data);

    return await this.repository.create({
      ...data,
      currentBalance: data.initialBalance,
    });
  }
}

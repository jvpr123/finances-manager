import { IUnitModel } from "src/domain/models/Unit.model";
import { IFindUnitByIdUseCase } from "src/domain/useCases/units/read/IFindUnitById.interface";

import { IFindUnitsRepository } from "src/data/protocols/database/units/FindUnitsRepository.interface";

import { NotFoundError } from "src/errors/NotFound.error";

export class FindUnitByIdUseCase implements IFindUnitByIdUseCase {
  constructor(private readonly repository: IFindUnitsRepository) {}

  async execute(id: string): Promise<IUnitModel> {
    const unitFound = await this.repository.findById(id);

    if (!unitFound)
      throw new NotFoundError(`Could not find data related to ${id} unit ID`);

    return unitFound;
  }
}

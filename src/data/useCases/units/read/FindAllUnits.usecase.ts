import { IUnitModel } from "src/domain/models/Unit.model";
import { IFindAllUnitsUseCase } from "src/domain/useCases/units/read/IFindAllUnits.interface";

import { IFindUnitsRepository } from "src/data/protocols/database/units/FindUnitsRepository.interface";

export class FindAllUnitsUseCase implements IFindAllUnitsUseCase {
  constructor(private readonly repository: IFindUnitsRepository) {}

  async execute(): Promise<IUnitModel[]> {
    return await this.repository.findAll();
  }
}

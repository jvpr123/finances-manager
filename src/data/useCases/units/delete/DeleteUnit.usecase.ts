import { IDeleteUnitUseCase } from "src/domain/useCases/units/delete/DeleteUnit.interface";

import { IDeleteUnitRepository } from "src/data/protocols/database/units/DeleteUnitRepository.interface";
import { IFindUnitsRepository } from "src/data/protocols/database/units/FindUnitsRepository.interface";

import { NotFoundError } from "src/errors/NotFound.error";

export class DeleteUnitUseCase implements IDeleteUnitUseCase {
  constructor(
    private readonly repository: IFindUnitsRepository & IDeleteUnitRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    const unitToDelete = await this.repository.findById(id);

    if (!unitToDelete)
      throw new NotFoundError(
        `Could not delete: data related to ID provided not found`
      );

    return await this.repository.delete(id);
  }
}

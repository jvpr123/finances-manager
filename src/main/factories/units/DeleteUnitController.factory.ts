import { Unit } from "src/infra/database/typeORM/units/Unit.entity";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { UnitTypeOrmRepository } from "src/infra/database/typeORM/units/UnitTypeORM.repository";

import { DeleteUnitUseCase } from "src/data/useCases/units/delete/DeleteUnit.usecase";

import { IController } from "src/presentation/protocols/Controller.interface";
import { DeleteUnitController } from "src/presentation/controllers/units/delete/DeleteUnit.controller";

export const makeDeleteUnitController = (): IController => {
  const repository = new UnitTypeOrmRepository(
    TypeOrmDataSource.getRepository<Unit>(Unit)
  );

  const deleteUnitUseCase = new DeleteUnitUseCase(repository);

  return new DeleteUnitController(deleteUnitUseCase);
};

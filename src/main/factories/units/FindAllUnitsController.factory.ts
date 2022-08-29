import { IController } from "src/presentation/protocols/Controller.interface";
import { FindAllUnitsController } from "src/presentation/controllers/units/read/FindAllUnits.controller";

import { Unit } from "src/infra/database/typeORM/units/Unit.entity";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { UnitTypeOrmRepository } from "src/infra/database/typeORM/units/UnitTypeORM.repository";

import { FindAllUnitsUseCase } from "src/data/useCases/units/read/FindAllUnits.usecase";

export const makeFindAllUnitsController = (): IController => {
  const repository = new UnitTypeOrmRepository(
    TypeOrmDataSource.getRepository<Unit>(Unit)
  );

  const findAllUnitsUseCase = new FindAllUnitsUseCase(repository);

  return new FindAllUnitsController(findAllUnitsUseCase);
};

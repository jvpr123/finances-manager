import { IController } from "src/presentation/protocols/Controller.interface";
import { FindUnitByIdController } from "src/presentation/controllers/units/read/FindUnitById.controller";

import { Unit } from "src/infra/database/typeORM/units/Unit.entity";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { UnitTypeOrmRepository } from "src/infra/database/typeORM/units/UnitTypeORM.repository";

import { FindUnitByIdUseCase } from "src/data/useCases/units/read/FindUnitById.usecase";

export const makeFindUnitByIdController = (): IController => {
  const repository = new UnitTypeOrmRepository(
    TypeOrmDataSource.getRepository<Unit>(Unit)
  );

  const findUnitByIdUseCase = new FindUnitByIdUseCase(repository);

  return new FindUnitByIdController(findUnitByIdUseCase);
};

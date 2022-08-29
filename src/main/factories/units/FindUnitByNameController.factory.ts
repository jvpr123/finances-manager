import { IController } from "src/presentation/protocols/Controller.interface";
import { FindUnitByNameController } from "src/presentation/controllers/units/read/FindUnitByName.controller";

import { JoiValidatorAdapter } from "src/infra/validation/joi/JoiValidator.adapter";
import { FindUnitByNameJoiSchema } from "src/infra/validation/joi/schemas/units/FindUnitByName.schema";

import { Unit } from "src/infra/database/typeORM/units/Unit.entity";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { UnitTypeOrmRepository } from "src/infra/database/typeORM/units/UnitTypeORM.repository";

import { FindUnitByNameUseCase } from "src/data/useCases/units/read/FindUnitByName.usecase";

export const makeFindUnitByNameController = (): IController => {
  const validator = new JoiValidatorAdapter(FindUnitByNameJoiSchema);
  const repository = new UnitTypeOrmRepository(
    TypeOrmDataSource.getRepository<Unit>(Unit)
  );

  const findUnitByNameUseCase = new FindUnitByNameUseCase(
    validator,
    repository
  );

  return new FindUnitByNameController(findUnitByNameUseCase);
};

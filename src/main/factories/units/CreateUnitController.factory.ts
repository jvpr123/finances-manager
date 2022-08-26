import { JoiValidatorAdapter } from "src/infra/validation/joi/JoiValidator.adapter";
import { CreateUnitJoiSchema } from "src/infra/validation/joi/schemas/units/CreateUnit.schema";

import { Unit } from "src/infra/database/typeORM/units/Unit.entity";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { UnitTypeOrmRepository } from "src/infra/database/typeORM/units/UnitTypeORM.repository";

import { CreateUnitUseCase } from "src/data/useCases/units/create/CreateUnit.usecase";

import { IController } from "src/presentation/protocols/Controller.interface";
import { CreateUnitController } from "src/presentation/controllers/units/create/CreateUnit.controller";

export const makeCreateUserController = (): IController => {
  const validator = new JoiValidatorAdapter(CreateUnitJoiSchema);
  const repository = new UnitTypeOrmRepository(
    TypeOrmDataSource.getRepository<Unit>(Unit)
  );

  const createUnitUseCase = new CreateUnitUseCase(validator, repository);

  return new CreateUnitController(createUnitUseCase);
};

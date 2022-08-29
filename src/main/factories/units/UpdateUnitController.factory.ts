import { JoiValidatorAdapter } from "src/infra/validation/joi/JoiValidator.adapter";
import { UpdateUnitJoiSchema } from "src/infra/validation/joi/schemas/units/UpdateUnit.schema";

import { Unit } from "src/infra/database/typeORM/units/Unit.entity";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { UnitTypeOrmRepository } from "src/infra/database/typeORM/units/UnitTypeORM.repository";

import { UpdateUnitUseCase } from "src/data/useCases/units/update/UpdateUnit.usecase";

import { IController } from "src/presentation/protocols/Controller.interface";
import { UpdateUnitController } from "src/presentation/controllers/units/update/UpdateUnit.controller";

export const makeUpdateUnitController = (): IController => {
  const validator = new JoiValidatorAdapter(UpdateUnitJoiSchema);
  const repository = new UnitTypeOrmRepository(
    TypeOrmDataSource.getRepository<Unit>(Unit)
  );

  const updateUnitUseCase = new UpdateUnitUseCase(validator, repository);

  return new UpdateUnitController(updateUnitUseCase);
};

import { JoiValidatorAdapter } from "src/infra/validation/joi/JoiValidator.adapter";
import { CreateUnitJoiSchema } from "src/infra/validation/joi/schemas/units/CreateUnit.schema";
import { User } from "src/infra/database/typeORM/users/User.entity";

import { Unit } from "src/infra/database/typeORM/units/Unit.entity";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { UserTypeOrmRepository } from "src/infra/database/typeORM/users/UserTypeORM.repository";
import { UnitTypeOrmRepository } from "src/infra/database/typeORM/units/UnitTypeORM.repository";

import { CreateUnitUseCase } from "src/data/useCases/units/create/CreateUnit.usecase";

import { IController } from "src/presentation/protocols/Controller.interface";
import { CreateUnitController } from "src/presentation/controllers/units/create/CreateUnit.controller";

export const makeCreateUnitController = (): IController => {
  const validator = new JoiValidatorAdapter(CreateUnitJoiSchema);
  const usersRepository = new UserTypeOrmRepository(
    TypeOrmDataSource.getRepository<User>(User)
  );
  const unitsRepository = new UnitTypeOrmRepository(
    TypeOrmDataSource.getRepository<Unit>(Unit)
  );

  const createUnitUseCase = new CreateUnitUseCase(
    validator,
    usersRepository,
    unitsRepository
  );

  return new CreateUnitController(createUnitUseCase);
};

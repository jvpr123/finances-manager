import { IController } from "src/presentation/protocols/Controller.interface";
import { FindUserByEmailController } from "src/presentation/controllers/users/find/FindUserByEmail.controller";

import { User } from "src/infra/database/typeORM/users/User.entity";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { UserTypeOrmRepository } from "src/infra/database/typeORM/users/UserTypeORM.repository";
import { FindUserByEmailValidator } from "src/infra/validation/joi/users/find/FindUserByEmail.validator";

import { FindUserByEmailUseCase } from "src/data/useCases/users/read/FindUserByEmail.usecase";

export const makeFindUserByEmailController = (): IController => {
  const validator = new FindUserByEmailValidator();
  const repository = new UserTypeOrmRepository(
    TypeOrmDataSource.getRepository<User>(User)
  );

  const findUserByEmailUseCase = new FindUserByEmailUseCase(
    validator,
    repository
  );

  return new FindUserByEmailController(findUserByEmailUseCase);
};

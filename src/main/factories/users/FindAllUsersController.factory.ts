import { IController } from "src/presentation/protocols/Controller.interface";
import { FindAllUsersController } from "src/presentation/controllers/users/find/FindAllUsers.controller";

import { FindAllUsersUseCase } from "src/data/useCases/users/read/FindAllUsers.usecase";

import { User } from "src/infra/database/typeORM/users/User.entity";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { UserTypeOrmRepository } from "src/infra/database/typeORM/users/UserTypeORM.repository";

export const makeFindAllUsersController = (): IController => {
  const repository = new UserTypeOrmRepository(
    TypeOrmDataSource.getRepository<User>(User)
  );

  const findAllUsersUseCase = new FindAllUsersUseCase(repository);

  return new FindAllUsersController(findAllUsersUseCase);
};

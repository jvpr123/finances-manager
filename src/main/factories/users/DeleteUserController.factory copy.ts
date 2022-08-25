import { IController } from "src/presentation/protocols/Controller.interface";
import { DeleteUserController } from "../../../presentation/controllers/users/delete/DeleteUser.controller";

import { DeleteUserlUseCase } from "../../../data/useCases/users/delete/DeleteUser.usecase";

import { User } from "src/infra/database/typeORM/users/User.entity";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { UserTypeOrmRepository } from "src/infra/database/typeORM/users/UserTypeORM.repository";

export const makeDeleteUserController = (): IController => {
  const repository = new UserTypeOrmRepository(
    TypeOrmDataSource.getRepository<User>(User)
  );

  const deleteUserUseCase = new DeleteUserlUseCase(repository);

  return new DeleteUserController(deleteUserUseCase);
};

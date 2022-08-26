import { JoiValidatorAdapter } from "src/infra/validation/joi/JoiValidator.adapter";

import { User } from "src/infra/database/typeORM/users/User.entity";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { UpdateUserJoiSchema } from "src/infra/validation/joi/schemas/users/UpdateUser.schema";
import { UserTypeOrmRepository } from "src/infra/database/typeORM/users/UserTypeORM.repository";

import { UpdateUserUseCase } from "src/data/useCases/users/update/UpdateUser.usecase";

import { IController } from "src/presentation/protocols/Controller.interface";
import { UpdateUserController } from "src/presentation/controllers/users/update/UpdateUser.controller";

export const makeUpdateUserController = (): IController => {
  const validator = new JoiValidatorAdapter(UpdateUserJoiSchema);
  const repository = new UserTypeOrmRepository(
    TypeOrmDataSource.getRepository<User>(User)
  );

  const updateUserUseCase = new UpdateUserUseCase(validator, repository);

  return new UpdateUserController(updateUserUseCase);
};

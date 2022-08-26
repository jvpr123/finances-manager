import { JoiValidatorAdapter } from "src/infra/validation/joi/JoiValidator.adapter";
import { BcryptjsAdapter } from "src/infra/criptography/Bcryptjs.adapter";

import { User } from "src/infra/database/typeORM/users/User.entity";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { CreateUserJoiSchema } from "src/infra/validation/joi/schemas/users/CreateUser.schema";
import { UserTypeOrmRepository } from "src/infra/database/typeORM/users/UserTypeORM.repository";

import { CreateUserUseCase } from "src/data/useCases/users/create/CreateUser.usecase";

import { IController } from "src/presentation/protocols/Controller.interface";
import { CreateUserController } from "src/presentation/controllers/users/create/CreateUser.controller";

export const makeCreateUserController = (): IController => {
  const validator = new JoiValidatorAdapter(CreateUserJoiSchema);
  const encrypter = new BcryptjsAdapter(12);
  const repository = new UserTypeOrmRepository(
    TypeOrmDataSource.getRepository<User>(User)
  );

  const createUserUseCase = new CreateUserUseCase(
    validator,
    encrypter,
    repository
  );

  return new CreateUserController(createUserUseCase);
};

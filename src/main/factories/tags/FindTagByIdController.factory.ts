import { IController } from "src/presentation/protocols/Controller.interface";
import { FindTagByIdController } from "src/presentation/controllers/tags/read/FindTagById.controller";

import { FindTagByIdUseCase } from "src/data/useCases/tags/read/FindTagById.usecase";

import { TagTypeOrmRepository } from "src/infra/database/typeORM/tags/TagTypeORM.repository";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { Tag } from "src/infra/database/typeORM/tags/Tag.entity";

export const makeFindTagByIdController = (): IController => {
  const repository = new TagTypeOrmRepository(
    TypeOrmDataSource.getRepository<Tag>(Tag)
  );

  const findTagByIdUsecase = new FindTagByIdUseCase(repository);

  return new FindTagByIdController(findTagByIdUsecase);
};

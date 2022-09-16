import { IController } from "src/presentation/protocols/Controller.interface";
import { FindAllTagsController } from "src/presentation/controllers/tags/read/FindAllTags.controller";

import { FindAllTagsUseCase } from "src/data/useCases/tags/read/FindAllTags.usecase";

import { TagTypeOrmRepository } from "src/infra/database/typeORM/tags/TagTypeORM.repository";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { Tag } from "src/infra/database/typeORM/tags/Tag.entity";

export const makeFindAllTagsController = (): IController => {
  const repository = new TagTypeOrmRepository(
    TypeOrmDataSource.getRepository<Tag>(Tag)
  );

  const findAllTagsUsecase = new FindAllTagsUseCase(repository);

  return new FindAllTagsController(findAllTagsUsecase);
};

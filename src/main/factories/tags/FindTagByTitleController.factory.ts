import { IController } from "src/presentation/protocols/Controller.interface";
import { FindTagByTitleController } from "src/presentation/controllers/tags/read/FindTagByTitle.controller";

import { FindTagByTitleUseCase } from "src/data/useCases/tags/read/FindTagByTitle.usecase";

import { TagTypeOrmRepository } from "src/infra/database/typeORM/tags/TagTypeORM.repository";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { Tag } from "src/infra/database/typeORM/tags/Tag.entity";

export const makeFindTagByTitleController = (): IController => {
  const repository = new TagTypeOrmRepository(
    TypeOrmDataSource.getRepository<Tag>(Tag)
  );

  const findTagByTitleUsecase = new FindTagByTitleUseCase(repository);

  return new FindTagByTitleController(findTagByTitleUsecase);
};

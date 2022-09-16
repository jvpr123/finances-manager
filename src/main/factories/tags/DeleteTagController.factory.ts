import { IController } from "src/presentation/protocols/Controller.interface";
import { DeleteTagController } from "src/presentation/controllers/tags/delete/DeleteTag.controller";

import { DeleteTagUseCase } from "src/data/useCases/tags/delete/DeleteTag.usecase";

import { TagTypeOrmRepository } from "src/infra/database/typeORM/tags/TagTypeORM.repository";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { Tag } from "src/infra/database/typeORM/tags/Tag.entity";

export const makeDeleteTagController = (): IController => {
  const repository = new TagTypeOrmRepository(
    TypeOrmDataSource.getRepository<Tag>(Tag)
  );

  const deleteTagUsecase = new DeleteTagUseCase(repository);

  return new DeleteTagController(deleteTagUsecase);
};

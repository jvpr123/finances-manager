import { IController } from "src/presentation/protocols/Controller.interface";
import { CreateTagController } from "src/presentation/controllers/tags/create/CreateTag.controller";

import { CreateTagUseCase } from "src/data/useCases/tags/create/CreateTag.usecase";

import { JoiValidatorAdapter } from "src/infra/validation/joi/JoiValidator.adapter";
import { CreateTagJoiSchema } from "src/infra/validation/joi/schemas/tags/CreateTag.schema";

import { TagTypeOrmRepository } from "src/infra/database/typeORM/tags/TagTypeORM.repository";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { Tag } from "src/infra/database/typeORM/tags/Tag.entity";

export const makeCreateTagController = (): IController => {
  const validator = new JoiValidatorAdapter(CreateTagJoiSchema);
  const repository = new TagTypeOrmRepository(
    TypeOrmDataSource.getRepository<Tag>(Tag)
  );

  const createTagUsecase = new CreateTagUseCase(validator, repository);

  return new CreateTagController(createTagUsecase);
};

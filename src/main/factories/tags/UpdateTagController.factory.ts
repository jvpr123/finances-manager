import { IController } from "src/presentation/protocols/Controller.interface";
import { UpdateTagController } from "src/presentation/controllers/tags/update/UpdateTag.controller";

import { UpdateTagUseCase } from "src/data/useCases/tags/update/UpdateTag.usecase";

import { JoiValidatorAdapter } from "src/infra/validation/joi/JoiValidator.adapter";
import { UpdateTagJoiSchema } from "src/infra/validation/joi/schemas/tags/UpdateTag.schema";

import { TagTypeOrmRepository } from "src/infra/database/typeORM/tags/TagTypeORM.repository";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { Tag } from "src/infra/database/typeORM/tags/Tag.entity";

export const makeUpdateTagController = (): IController => {
  const validator = new JoiValidatorAdapter(UpdateTagJoiSchema);
  const repository = new TagTypeOrmRepository(
    TypeOrmDataSource.getRepository<Tag>(Tag)
  );

  const updateTagUsecase = new UpdateTagUseCase(validator, repository);

  return new UpdateTagController(updateTagUsecase);
};

import { IController } from "src/presentation/protocols/Controller.interface";
import { UpdateCategoryController } from "src/presentation/controllers/categories/update/UpdateCategory.controller";

import { UpdateCategoryUseCase } from "src/data/useCases/categories/update/UpdateCategory.usecase";

import { JoiValidatorAdapter } from "src/infra/validation/joi/JoiValidator.adapter";
import { UpdateCategoryJoiSchema } from "src/infra/validation/joi/schemas/categories/UpdateCategory.schema";

import { CategoryTypeOrmRepository } from "src/infra/database/typeORM/categories/CategoryTypeORM.repository";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { Category } from "src/infra/database/typeORM/categories/Category.entity";

export const makeUpdateCategoryController = (): IController => {
  const validator = new JoiValidatorAdapter(UpdateCategoryJoiSchema);
  const repository = new CategoryTypeOrmRepository(
    TypeOrmDataSource.getRepository<Category>(Category)
  );

  const updateCategoryUsecase = new UpdateCategoryUseCase(
    validator,
    repository
  );

  return new UpdateCategoryController(updateCategoryUsecase);
};

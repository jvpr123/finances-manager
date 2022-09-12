import { IController } from "src/presentation/protocols/Controller.interface";
import { CreateCategoryController } from "src/presentation/controllers/categories/create/CreateCategory.controller";

import { CreateCategoryUseCase } from "src/data/useCases/categories/create/CreateCategory.usecase";

import { JoiValidatorAdapter } from "src/infra/validation/joi/JoiValidator.adapter";
import { CreateCategoryJoiSchema } from "src/infra/validation/joi/schemas/categories/CreateCategory.schema";

import { CategoryTypeOrmRepository } from "src/infra/database/typeORM/categories/CategoryTypeORM.repository";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { Category } from "src/infra/database/typeORM/categories/Category.entity";

export const makeCreatecategoryController = (): IController => {
  const validator = new JoiValidatorAdapter(CreateCategoryJoiSchema);
  const repository = new CategoryTypeOrmRepository(
    TypeOrmDataSource.getRepository<Category>(Category)
  );

  const createCategoryUsecase = new CreateCategoryUseCase(
    validator,
    repository
  );

  return new CreateCategoryController(createCategoryUsecase);
};

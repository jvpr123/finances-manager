import { IController } from "src/presentation/protocols/Controller.interface";
import { DeleteCategoryController } from "src/presentation/controllers/categories/delete/DeleteCategory.controller";

import { DeleteCategoryUseCase } from "src/data/useCases/categories/delete/DeleteCategory.usecase";

import { CategoryTypeOrmRepository } from "src/infra/database/typeORM/categories/CategoryTypeORM.repository";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { Category } from "src/infra/database/typeORM/categories/Category.entity";

export const makeDeleteCategoryController = (): IController => {
  const repository = new CategoryTypeOrmRepository(
    TypeOrmDataSource.getRepository<Category>(Category)
  );

  const deleteCategoryUseCase = new DeleteCategoryUseCase(repository);

  return new DeleteCategoryController(deleteCategoryUseCase);
};

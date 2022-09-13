import { IController } from "src/presentation/protocols/Controller.interface";
import { FindAllCategoriesController } from "src/presentation/controllers/categories/read/FindAllCategories.controller";

import { Category } from "src/infra/database/typeORM/categories/Category.entity";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { CategoryTypeOrmRepository } from "src/infra/database/typeORM/categories/CategoryTypeORM.repository";

import { FindAllCategoriesUseCase } from "src/data/useCases/categories/read/FindAllCategories.usecase";

export const makeFindAllCategoriesController = (): IController => {
  const repository = new CategoryTypeOrmRepository(
    TypeOrmDataSource.getRepository<Category>(Category)
  );

  const findAllCategoriesUseCase = new FindAllCategoriesUseCase(repository);

  return new FindAllCategoriesController(findAllCategoriesUseCase);
};

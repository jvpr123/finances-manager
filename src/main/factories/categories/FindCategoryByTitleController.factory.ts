import { IController } from "src/presentation/protocols/Controller.interface";
import { FindCategoryByTitleController } from "src/presentation/controllers/categories/read/FindCategoryByTitle.controller";

import { Category } from "src/infra/database/typeORM/categories/Category.entity";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { CategoryTypeOrmRepository } from "src/infra/database/typeORM/categories/CategoryTypeORM.repository";

import { FindCategoryByTitleUseCase } from "src/data/useCases/categories/read/FindCategoryByName.usecase";

export const makeFindCategoryByTitleController = (): IController => {
  const repository = new CategoryTypeOrmRepository(
    TypeOrmDataSource.getRepository<Category>(Category)
  );

  const findCategoryByTitleUseCase = new FindCategoryByTitleUseCase(repository);

  return new FindCategoryByTitleController(findCategoryByTitleUseCase);
};

import { IController } from "src/presentation/protocols/Controller.interface";
import { FindCategoryByIdController } from "src/presentation/controllers/categories/read/FindCategoryById.controller";

import { Category } from "src/infra/database/typeORM/categories/Category.entity";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { CategoryTypeOrmRepository } from "src/infra/database/typeORM/categories/CategoryTypeORM.repository";

import { FindCategoryByIdUseCase } from "src/data/useCases/categories/read/FindCategoryById.usecase";

export const makeFindCategoryByIdController = (): IController => {
  const repository = new CategoryTypeOrmRepository(
    TypeOrmDataSource.getRepository<Category>(Category)
  );

  const findCategoryByIdUseCase = new FindCategoryByIdUseCase(repository);

  return new FindCategoryByIdController(findCategoryByIdUseCase);
};

import { ICategoryModel } from "src/domain/models/Category.model";
import { IFindAllCategoriesUseCase } from "src/domain/useCases/categories/read/FindAllCategories.interface";

import { IFindCategoryRepository } from "src/data/protocols/database/categories/FindCategoryRepository.interface";

export class FindAllCategoriesUseCase implements IFindAllCategoriesUseCase {
  constructor(private readonly repository: IFindCategoryRepository) {}

  async execute(): Promise<ICategoryModel[]> {
    return await this.repository.findAll();
  }
}

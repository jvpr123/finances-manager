import { ICategoryModel } from "src/domain/models/Category.model";
import { IFindCategoryByIdUseCase } from "src/domain/useCases/categories/read/FindCategoryById.interface";

import { IFindCategoryRepository } from "src/data/protocols/database/categories/FindCategoryRepository.interface";
import { NotFoundError } from "src/errors/NotFound.error";

export class FindCategoryByIdUseCase implements IFindCategoryByIdUseCase {
  constructor(private readonly repository: IFindCategoryRepository) {}

  async execute(id: string): Promise<ICategoryModel> {
    const category = await this.repository.findById(id);

    if (!category)
      throw new NotFoundError(
        `Could not find data related to category ID provided`
      );

    return category;
  }
}

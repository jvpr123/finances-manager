import { ICategoryModel } from "src/domain/models/Category.model";
import { IFindCategoryByTitleUseCase } from "src/domain/useCases/categories/read/FindCategoryByTitle.interface";

import { IFindCategoryRepository } from "src/data/protocols/database/categories/FindCategoryRepository.interface";
import { NotFoundError } from "src/errors/NotFound.error";

export class FindCategoryByTitleUseCase implements IFindCategoryByTitleUseCase {
  constructor(private readonly repository: IFindCategoryRepository) {}

  async execute(title: string): Promise<ICategoryModel> {
    const category = await this.repository.findByTitle(title);

    if (!category)
      throw new NotFoundError(
        `Could not find data related to ${title} category`
      );

    return category;
  }
}

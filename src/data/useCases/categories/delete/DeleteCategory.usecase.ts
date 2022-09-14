import { IDeleteCategoryUseCase } from "src/domain/useCases/categories/delete/DeleteCategory.interface";

import { IFindCategoryRepository } from "src/data/protocols/database/categories/FindCategoryRepository.interface";
import { IDeleteCategoryRepository } from "src/data/protocols/database/categories/DeleteCategoryRepository.interface";

import { NotFoundError } from "src/errors/NotFound.error";

export class DeleteCategoryUseCase implements IDeleteCategoryUseCase {
  constructor(
    private readonly repository: IFindCategoryRepository &
      IDeleteCategoryRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    const categoryToDelete = await this.repository.findById(id);

    if (!categoryToDelete)
      throw new NotFoundError(
        `Could not delete: data related to ID provided not found`
      );

    return await this.repository.delete(categoryToDelete.id);
  }
}

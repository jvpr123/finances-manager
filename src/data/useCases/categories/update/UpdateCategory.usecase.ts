import { IUpdateCategoryUseCase } from "src/domain/useCases/categories/update/UpdateCategory.interface";
import { IUpdateCategoryInput } from "src/domain/dto/categories/UpdateCategory.dto";
import { ICategoryModel } from "src/domain/models/Category.model";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { IFindCategoryRepository } from "src/data/protocols/database/categories/FindCategoryRepository.interface";
import { IUpdateCategoryRepository } from "src/data/protocols/database/categories/UpdateCategoryRepository.interface";

import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";

type IRepository = IFindCategoryRepository & IUpdateCategoryRepository;

export class UpdateCategoryUseCase implements IUpdateCategoryUseCase {
  constructor(
    private readonly validator: IValidator,
    private readonly repository: IRepository
  ) {}

  async execute(input: IUpdateCategoryInput): Promise<ICategoryModel> {
    const { isValid, data } = this.validator.validate(input);
    const categoryTitleAlreadyExists = await this.repository.findByTitle(
      data?.title
    );

    if (!isValid) throw new ValidationError(data);

    if (categoryTitleAlreadyExists)
      throw new ValidationError([`'title' provided is already in use`]);

    const categoryToUpdate = await this.repository.findById(data.id);

    if (!categoryToUpdate)
      throw new NotFoundError(
        `Could not update: data related to ID provided not found`
      );

    return await this.repository.update(data);
  }
}

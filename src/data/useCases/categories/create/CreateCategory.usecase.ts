import { ICreateCategoryUseCase } from "src/domain/useCases/categories/create/CreateCategory.interface";
import { ICreateCategoryInput } from "src/domain/dto/categories/CreateCategory.dto";
import { ICategoryModel } from "src/domain/models/Category.model";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { ICreateCategoryRepository } from "src/data/protocols/database/categories/CreateCategoryRepository.interface";
import { IFindCategoryRepository } from "src/data/protocols/database/categories/FindCategoryRepository.interface";

import { ValidationError } from "src/errors/Validation.error";

type IRepository = ICreateCategoryRepository & IFindCategoryRepository;

export class CreateCategoryUseCase implements ICreateCategoryUseCase {
  constructor(
    private readonly validator: IValidator,
    private readonly repository: IRepository
  ) {}

  async execute(input: ICreateCategoryInput): Promise<ICategoryModel> {
    const { isValid, data } = this.validator.validate(input);
    const categoryTitleAlreadyExists = await this.repository.findByTitle(
      input?.title
    );

    if (!isValid) throw new ValidationError(data);
    if (categoryTitleAlreadyExists) {
      throw new ValidationError(["Category title already in use"]);
    }

    return await this.repository.create(data);
  }
}

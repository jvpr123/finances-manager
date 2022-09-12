import { ICreateCategoryUseCase } from "src/domain/useCases/categories/create/CreateCategory.interface";
import { ICreateCategoryInput } from "src/domain/dto/categories/CreateCategory.dto";
import { ICategoryModel } from "src/domain/models/Category.model";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { ICreateCategoryRepository } from "src/data/protocols/database/categories/CreateCategoryRepository.interface";

import { ValidationError } from "src/errors/Validation.error";

export class CreateCategoryUseCase implements ICreateCategoryUseCase {
  constructor(
    private readonly validator: IValidator,
    private readonly repository: ICreateCategoryRepository
  ) {}

  async execute(input: ICreateCategoryInput): Promise<ICategoryModel> {
    const { isValid, data } = this.validator.validate(input);

    if (!isValid) throw new ValidationError(data);

    return await this.repository.create(data);
  }
}

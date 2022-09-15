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
    const dataToUpdate = await this.validateData(input);
    await this.getCategory(dataToUpdate.id);

    return await this.repository.update(dataToUpdate);
  }

  private async validateData(
    input: IUpdateCategoryInput
  ): Promise<IUpdateCategoryInput> {
    const { isValid, data } = this.validator.validate(input);
    const categoryAlreadyExists = await this.repository.findByTitle(
      input.title
    );

    if (!isValid) {
      throw categoryAlreadyExists
        ? new ValidationError([...data, '"title" provided already in use'])
        : new ValidationError(data);
    }

    if (isValid && categoryAlreadyExists)
      throw new ValidationError([`"category" provided already in use`]);

    return data;
  }

  private async getCategory(categoryId: string): Promise<void> {
    const category = await this.repository.findById(categoryId);

    if (!category)
      throw new NotFoundError(
        `Could not update: data related to ID provided not found`
      );
  }
}

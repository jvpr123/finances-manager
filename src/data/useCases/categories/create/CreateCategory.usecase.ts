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
    const dataToCreate = await this.validateData(input);

    return await this.repository.create(dataToCreate);
  }

  private async validateData(
    input: ICreateCategoryInput
  ): Promise<ICreateCategoryInput> {
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
}

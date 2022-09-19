import { ICreateTransactionUseCase } from "src/domain/useCases/transactions/create/CreateTransaction.interface";
import { ICreateTransactionInput } from "src/domain/dto/transactions/CreateTransaction.dto";
import { ITransactionModel } from "src/domain/models/Transaction.model";
import { ICategoryModel } from "src/domain/models/Category.model";
import { IUnitModel } from "src/domain/models/Unit.model";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { IFindUnitsRepository } from "src/data/protocols/database/units/FindUnitsRepository.interface";
import { IFindCategoryRepository } from "src/data/protocols/database/categories/FindCategoryRepository.interface";
import { IFindTagsRepository } from "src/data/protocols/database/tags/FindTagsRepository.interface";
import { ICreateTransactionRepository } from "src/data/protocols/database/transactions/CreateTransactionRepository.interface";

import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";
import { ITagModel } from "src/domain/models/Tag.model";

export class CreateTransactionUseCase implements ICreateTransactionUseCase {
  constructor(
    private readonly validator: IValidator,
    private readonly unitsRepository: IFindUnitsRepository,
    private readonly categoriesRepository: IFindCategoryRepository,
    private readonly tagsRepository: IFindTagsRepository,
    private readonly transactionsRepository: ICreateTransactionRepository
  ) {}

  async execute(input: ICreateTransactionInput): Promise<ITransactionModel> {
    const { unitId, categoryId, tagsId, ...creationData } =
      this.validateData(input);

    const unit = await this.getUnit(unitId);
    const category = await this.getCategory(categoryId);
    const tags = tagsId ? await this.getTags(tagsId) : [];

    console.log(tagsId);
    console.log(tags);

    return await this.transactionsRepository.create({
      ...creationData,
      unit,
      category,
      tags,
    });
  }

  private validateData(input: ICreateTransactionInput) {
    const { isValid, data } = this.validator.validate(input);

    if (!isValid) throw new ValidationError(data);

    return data;
  }

  private async getUnit(unitId: string): Promise<IUnitModel> {
    const unit = await this.unitsRepository.findById(unitId);

    if (!unit)
      throw new NotFoundError(
        "Could not create: Unit data related to ID provided not found"
      );

    return unit;
  }

  private async getCategory(categoryId: string): Promise<ICategoryModel> {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category)
      throw new NotFoundError(
        "Could not create: Category data related to ID provided not found"
      );

    return category;
  }

  private async getTags(tagsId: string[]): Promise<ITagModel[]> {
    let foundTags: ITagModel[] = [];
    let notFoundTags: string[] = [];

    for (let i = 0; i < tagsId.length; i++) {
      const tag = await this.tagsRepository.findById(tagsId[i]);
      tag ? foundTags.push(tag) : notFoundTags.push(tagsId[i]);
    }

    if (notFoundTags.length > 0)
      throw new NotFoundError(
        `Could not create: some tags provided were not found: ${notFoundTags}`
      );

    return foundTags;
  }
}

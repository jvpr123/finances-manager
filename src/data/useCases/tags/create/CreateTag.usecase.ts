import { ICreateTagUseCase } from "src/domain/useCases/tags/create/CreateTag.interface";
import { ICreateTagInput } from "src/domain/dto/tags/CreateTag.dto";
import { ITagModel } from "src/domain/models/Tag.model";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { ICreateTagRepository } from "src/data/protocols/database/tags/CreateTagRepository.interface";

import { ValidationError } from "src/errors/Validation.error";

export class CreateTagUseCase implements ICreateTagUseCase {
  constructor(
    private readonly validator: IValidator,
    private readonly repository: ICreateTagRepository
  ) {}

  async execute(input: ICreateTagInput): Promise<ITagModel> {
    const dataToCreate = await this.validateData(input);

    return await this.repository.create(dataToCreate);
  }

  private validateData(input: ICreateTagInput): Promise<ICreateTagInput> {
    const { isValid, data } = this.validator.validate(input);

    if (!isValid) {
      throw new ValidationError(data);
    }

    return data;
  }
}

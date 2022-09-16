import { ICreateTagUseCase } from "src/domain/useCases/tags/create/CreateTag.interface";
import { ICreateTagInput } from "src/domain/dto/tags/CreateTag.dto";
import { ITagModel } from "src/domain/models/Tag.model";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { ICreateTagRepository } from "src/data/protocols/database/tags/CreateTagRepository.interface";
import { IFindTagsRepository } from "src/data/protocols/database/tags/FindTagsRepository.interface";

import { ValidationError } from "src/errors/Validation.error";

type IRepository = ICreateTagRepository & IFindTagsRepository;

export class CreateTagUseCase implements ICreateTagUseCase {
  constructor(
    private readonly validator: IValidator,
    private readonly repository: IRepository
  ) {}

  async execute(input: ICreateTagInput): Promise<ITagModel> {
    const dataToCreate = await this.validateData(input);

    return await this.repository.create(dataToCreate);
  }

  private async validateData(input: ICreateTagInput): Promise<ICreateTagInput> {
    const { isValid, data } = this.validator.validate(input);
    const tagAlreadyExists = await this.repository.findByTitle(input.title);

    if (!isValid) {
      throw tagAlreadyExists
        ? new ValidationError([...data, '"title" provided already in use'])
        : new ValidationError(data);
    }

    if (isValid && tagAlreadyExists)
      throw new ValidationError([`"title" provided already in use`]);

    return data;
  }
}

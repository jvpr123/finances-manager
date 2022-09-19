import { IUpdateTagUseCase } from "src/domain/useCases/tags/update/UpdateTag.interface";
import { IUpdateTagInput } from "src/domain/dto/tags/UpdateTag.dto";
import { ITagModel } from "src/domain/models/Tag.model";

import { IValidator } from "src/data/protocols/validation/Validator.interface";
import { IFindTagsRepository } from "src/data/protocols/database/tags/FindTagsRepository.interface";
import { IUpdateTagRepository } from "src/data/protocols/database/tags/UpdateTagRepository.interface";

import { ValidationError } from "src/errors/Validation.error";
import { NotFoundError } from "src/errors/NotFound.error";

type IRepository = IFindTagsRepository & IUpdateTagRepository;

export class UpdateTagUseCase implements IUpdateTagUseCase {
  constructor(
    private readonly validator: IValidator,
    private readonly repository: IRepository
  ) {}

  async execute(input: IUpdateTagInput): Promise<ITagModel> {
    const dataToUpdate = await this.validateData(input);
    await this.getTag(dataToUpdate.id);

    return await this.repository.update(dataToUpdate);
  }

  private async validateData(input: IUpdateTagInput): Promise<IUpdateTagInput> {
    const { isValid, data } = this.validator.validate(input);
    const tagAlreadyExists = await this.repository.findByTitle(input.title);

    if (!isValid) {
      throw tagAlreadyExists
        ? new ValidationError([...data, '"title" provided already in use'])
        : new ValidationError(data);
    }

    if (isValid && tagAlreadyExists)
      throw new ValidationError([`"tag" provided already in use`]);

    return data;
  }

  private async getTag(tagId: string): Promise<void> {
    const tag = await this.repository.findById(tagId);

    if (!tag)
      throw new NotFoundError(
        `Could not update: data related to ID provided not found`
      );
  }
}

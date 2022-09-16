import { ITagModel } from "src/domain/models/Tag.model";
import { IFindAllTagsUseCase } from "src/domain/useCases/tags/read/FindAllTags.interface";

import { IFindTagsRepository } from "src/data/protocols/database/tags/FindTagsRepository.interface";

export class FindAllTagsUseCase implements IFindAllTagsUseCase {
  constructor(private readonly repository: IFindTagsRepository) {}

  async execute(): Promise<ITagModel[]> {
    return await this.repository.findAll();
  }
}

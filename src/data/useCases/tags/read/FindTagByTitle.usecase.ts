import { ITagModel } from "src/domain/models/Tag.model";
import { IFindTagByTitleUseCase } from "src/domain/useCases/tags/read/FindTagByTitle.interface";

import { IFindTagsRepository } from "src/data/protocols/database/tags/FindTagsRepository.interface";
import { NotFoundError } from "src/errors/NotFound.error";

export class FindTagByTitleUseCase implements IFindTagByTitleUseCase {
  constructor(private readonly repository: IFindTagsRepository) {}

  async execute(title: string): Promise<ITagModel> {
    const tag = await this.repository.findByTitle(title);

    if (!tag)
      throw new NotFoundError(`Could not find data related to ${title} tag`);

    return tag;
  }
}

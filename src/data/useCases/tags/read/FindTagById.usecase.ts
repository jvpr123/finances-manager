import { ITagModel } from "src/domain/models/Tag.model";
import { IFindTagByIdUseCase } from "src/domain/useCases/tags/read/FindTagById.interface";

import { IFindTagsRepository } from "src/data/protocols/database/tags/FindTagsRepository.interface";
import { NotFoundError } from "src/errors/NotFound.error";

export class FindTagByIdUseCase implements IFindTagByIdUseCase {
  constructor(private readonly repository: IFindTagsRepository) {}

  async execute(id: string): Promise<ITagModel> {
    const category = await this.repository.findById(id);

    if (!category)
      throw new NotFoundError(`Could not find data related to tag ID provided`);

    return category;
  }
}

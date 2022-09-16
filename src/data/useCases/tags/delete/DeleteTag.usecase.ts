import { IDeleteTagUseCase } from "src/domain/useCases/tags/delete/DeleteTag.interface";

import { IFindTagsRepository } from "src/data/protocols/database/tags/FindTagsRepository.interface";
import { IDeleteTagRepository } from "src/data/protocols/database/tags/DeleteTagRepository.interface";

import { NotFoundError } from "src/errors/NotFound.error";
import { ITagModel } from "src/domain/models/Tag.model";

export class DeleteTagUseCase implements IDeleteTagUseCase {
  constructor(
    private readonly repository: IFindTagsRepository & IDeleteTagRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    const tagToDelete = await this.getTag(id);
    return await this.repository.delete(tagToDelete.id);
  }

  private async getTag(id: string): Promise<ITagModel> {
    const tag = await this.repository.findById(id);

    if (!tag)
      throw new NotFoundError(
        `Could not delete: data related to ID provided not found`
      );

    return tag;
  }
}
